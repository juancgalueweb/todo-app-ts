import { type Request, type Response } from 'express'
import { type AuthRequest } from '../../custom.d'
import { createUserService } from '../services/user.services'
import { verifyEmailService } from '../services/verifyEmail.services'

const createUser = async (req: Request, res: Response): Promise<void> => {
  const { body } = req

  const { msg, success, statusCode, token } = await createUserService(body)

  res.status(statusCode).json({
    success,
    msg,
    token
  })
}

const verifyEmail = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.userId as string
  const otpHash = req.otpHash as string
  const { otp } = req.body

  const { success, msg, statusCode, userEmail, tokenApp, invalidOTP } =
    await verifyEmailService(otp, userId, otpHash)

  res.status(statusCode).json({
    success,
    msg,
    userEmail,
    tokenApp,
    invalidOTP
  })
}

export { createUser, verifyEmail }
