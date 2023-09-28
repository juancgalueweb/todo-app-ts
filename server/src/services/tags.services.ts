import { HttpStatusCode } from '../constants/http'
import { MSGS_RESPONSES } from '../constants/msgs'
import {
  duplicateKeyErrorHandler,
  mongooseValidationErrorHandler
} from '../helpers/mongooseErrorsHandler'
import TagModel from '../models/tags.model'
import { type IGetTags, type ISaveTag, type ITag } from '../types/tags.types'

export const saveTagService = async (
  userId: string | undefined,
  body: ITag
): Promise<ISaveTag> => {
  try {
    const modifiedTagName = body.tagName.toLowerCase().split(' ').join('-')
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
    if (error.code === 11000) {
      return {
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        msg: duplicateKeyErrorHandler(error)
      }
    }
    return {
      success: false,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      msg: MSGS_RESPONSES.TAG_SAVE_ERROR
    }
  }
}

export const getTagsService = async (
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
    const tagToDelete: ITag | null = await TagModel.findById({ _id: tagId })
    if (tagToDelete === null) {
      return {
        success: false,
        statusCode: HttpStatusCode.NOT_FOUND,
        msg: MSGS_RESPONSES.TAG_NOT_FOUND
      }
    }
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
  tagId: string,
  body: ITag
): Promise<ISaveTag> => {
  try {
    // Check if tag exists in the database
    const tagToUpdate: ITag | null = await TagModel.findById({ _id: tagId })
    if (tagToUpdate === null) {
      return {
        success: false,
        statusCode: HttpStatusCode.NOT_FOUND,
        msg: MSGS_RESPONSES.TAG_NOT_FOUND
      }
    }

    const modifiedTagName = body.tagName.toLowerCase().split(' ').join('-')

    const updatedTag: ITag | null = await TagModel.findByIdAndUpdate(
      { _id: tagId },
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
