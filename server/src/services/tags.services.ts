import { HttpStatusCode } from '../constants/http'
import { MSGS_RESPONSES } from '../constants/msgs'
import {
  duplicateKeyErrorHandler,
  mongooseValidationErrorHandler
} from '../helpers/mongooseErrorsHandler'
import TagModel from '../models/tags.model'
import { type ISaveTag, type ITag } from '../types/tags.types'

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
