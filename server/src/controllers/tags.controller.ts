import { type Request, type Response } from 'express'
import { saveTagService } from '../services/tags.services'

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
