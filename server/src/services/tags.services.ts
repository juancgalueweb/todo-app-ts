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
    // Create a new tag
    const newTag: ITag = await TagModel.create({ ...body, userId })

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
