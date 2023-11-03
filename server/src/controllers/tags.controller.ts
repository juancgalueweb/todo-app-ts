import type { Request, Response } from 'express'
import {
  deleteTagService,
  getTagsByUserService,
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
export const getTagsByUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req
  const { success, statusCode, msg, tags } = await getTagsByUserService(userId)

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
  const { body, userId } = req
  const { success, statusCode, msg, tag } = await updateTagService(
    userId,
    tagId,
    body
  )

  res.status(statusCode).json({
    success,
    msg,
    tag
  })
}
