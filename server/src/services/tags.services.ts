import { HttpStatusCode } from '../constants/http'
import { MSGS_RESPONSES } from '../constants/msgs'
import { mongooseValidationErrorHandler } from '../helpers/mongooseErrorsHandler'
import TagModel from '../models/tags.model'
import TodoModel from '../models/todo.model'
import { type IGetTags, type ISaveTag, type ITag } from '../types/tags.types'

export const saveTagService = async (
  userId: string | undefined,
  body: ITag
): Promise<ISaveTag> => {
  try {
    const tagNameWithoutSpaces = body.tagName.trim()
    const modifiedTagName = tagNameWithoutSpaces
      .toLowerCase()
      .split(' ')
      .join('-')

    // Verify if there is already a tag with the same name and userId
    const existingTagByName = await TagModel.findOne({
      userId,
      tagName: modifiedTagName
    })

    // Verify if there is already a tag with the same color and userId
    const existingTagByColor = await TagModel.findOne({
      userId,
      tagColor: body.tagColor
    })

    if (existingTagByName) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: MSGS_RESPONSES.TAG_NAME_ALREADY_EXISTS
      }
    }

    if (existingTagByColor) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: MSGS_RESPONSES.TAG_COLOR_ALREADY_EXISTS
      }
    }

    // Create a new tag
    const newTag: ITag = await TagModel.create({
      ...body,
      tagName: modifiedTagName,
      userId
    })

    return {
      success: true,
      msg: MSGS_RESPONSES.TAG_CREATED,
      statusCode: HttpStatusCode.CREATED,
      tag: newTag
    }
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: mongooseValidationErrorHandler(error)
      }
    }
    return {
      success: false,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      msg: MSGS_RESPONSES.TAG_SAVE_ERROR
    }
  }
}

export const getTagsByUserService = async (
  userId: string | undefined
): Promise<IGetTags> => {
  try {
    const tags = await TagModel.find({ userId })
    return {
      success: true,
      statusCode: HttpStatusCode.OK,
      msg: `${
        tags.length === 0
          ? MSGS_RESPONSES.TAGS_EMPTY
          : MSGS_RESPONSES.TAGS_FETCHED
      }`,
      tags
    }
  } catch (error) {
    return {
      success: false,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      msg: MSGS_RESPONSES.TAGS_FETCH_ERROR
    }
  }
}

export const deleteTagService = async (tagId: string): Promise<ISaveTag> => {
  try {
    // check if tag exists
    const tagToDelete: ITag | null = await TagModel.findById(tagId)
    if (tagToDelete === null) {
      return {
        success: false,
        statusCode: HttpStatusCode.NOT_FOUND,
        msg: MSGS_RESPONSES.TAG_NOT_FOUND
      }
    }

    // Update the todos to remove the tag
    await TodoModel.updateMany(
      { tags: { $in: [tagId] } },
      { $pull: { tags: tagId } }
    )

    // Delete the tag from the database
    await TagModel.findByIdAndDelete(tagId)

    return {
      success: true,
      statusCode: HttpStatusCode.OK,
      msg: MSGS_RESPONSES.TAG_DELETED
    }
  } catch (error) {
    return {
      success: false,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      msg: MSGS_RESPONSES.TAG_DELETE_ERROR
    }
  }
}

export const updateTagService = async (
  userId: string | undefined,
  tagId: string,
  body: ITag
): Promise<ISaveTag> => {
  try {
    // Check if tag exists in the database
    const tagToUpdate: ITag | null = await TagModel.findById(tagId)
    if (tagToUpdate === null) {
      return {
        success: false,
        statusCode: HttpStatusCode.NOT_FOUND,
        msg: MSGS_RESPONSES.TAG_NOT_FOUND
      }
    }

    const tagNameWithoutSpaces = body.tagName.trim()
    const modifiedTagName = tagNameWithoutSpaces
      .toLowerCase()
      .split(' ')
      .join('-')

    // Realizar consultas para verificar que el nombre y el color no coincidan con otras etiquetas del usuario
    const existingTagByName = await TagModel.findOne({
      userId,
      tagName: modifiedTagName,
      _id: { $ne: tagId }
    })

    const existingTagByColor = await TagModel.findOne({
      userId,
      tagColor: body.tagColor,
      _id: { $ne: tagId }
    })

    if (existingTagByName) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: MSGS_RESPONSES.TAG_NAME_ALREADY_EXISTS
      }
    }

    if (existingTagByColor) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: MSGS_RESPONSES.TAG_COLOR_ALREADY_EXISTS
      }
    }

    const updatedTag: ITag | null = await TagModel.findByIdAndUpdate(
      tagId,
      { ...body, tagName: modifiedTagName },
      { new: true, runValidators: true }
    )

    return {
      success: true,
      statusCode: HttpStatusCode.OK,
      msg: MSGS_RESPONSES.TAG_UPDATED,
      tag: updatedTag
    }
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: mongooseValidationErrorHandler(error)
      }
    }
    return {
      success: false,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      msg: MSGS_RESPONSES.TAG_UPDATE_ERROR
    }
  }
}
