import type { Request, Response } from 'express'
import { createUserService } from '../services/user.services'
import { verifyEmailService } from '../services/verifyEmail.services'

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userEmail } = req.body

  const { msg, success, statusCode, token } = await createUserService(userEmail)

  res.status(statusCode).json({
    success,
    msg,
    token
  })
}

export const verifyEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.userId as string
  const otpHash = req.otpHash as string
  const { otp } = req.body

  const { success, msg, statusCode, userEmail, token, invalidOTP } =
    await verifyEmailService(otp, userId, otpHash)

  res.status(statusCode).json({
    success,
    msg,
    userEmail,
    token,
    invalidOTP
  })
}
