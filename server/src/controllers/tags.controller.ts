import { type Request, type Response } from 'express'
import {
  deleteTagService,
  getTagsService,
  saveTagService,
  updateTagService
} from '../services/tags.services'

// save a tag controller
export const saveTag = async (req: Request, res: Response): Promise<void> => {
  const { body, userId } = req
  const { success, statusCode, msg, tag } = await saveTagService(userId, body)

  res.status(statusCode).json({
    success,
    msg,
    tag
  })
}

// get tags controller
export const getTags = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req
  const { success, statusCode, msg, tags } = await getTagsService(userId)

  res.status(statusCode).json({
    success,
    msg,
    tags
  })
}

// delete tag controller
export const deleteTag = async (req: Request, res: Response): Promise<void> => {
  const { tagId } = req.params
  const { success, statusCode, msg } = await deleteTagService(tagId)

  res.status(statusCode).json({
    success,
    msg
  })
}

// update controller
export const updateTag = async (req: Request, res: Response): Promise<void> => {
  const { tagId } = req.params
  const { body } = req
  const { success, statusCode, msg, tag } = await updateTagService(tagId, body)

  res.status(statusCode).json({
    success,
    msg,
    tag
  })
}
