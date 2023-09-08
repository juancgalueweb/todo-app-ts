import { type Request, type Response } from 'express'
import { createUserService } from '../services/user.services'
import { verifyEmailService } from '../services/verifyEmail.services'

const createUser = async (req: Request, res: Response): Promise<void> => {
  const { body } = req

  const { msg, success, statusCode, userId, token } =
    await createUserService(body)

  res.status(statusCode).json({
    success,
    msg,
    userId,
    token
  })
}

const verifyEmail = async (req: Request, res: Response): Promise<void> => {
  const { body } = req

  const { success, msg, statusCode, userEmail, token } =
    await verifyEmailService(body)

  res.status(statusCode).json({
    success,
    msg,
    userEmail,
    token
  })
}

export { createUser, verifyEmail }
