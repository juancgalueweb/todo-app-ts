import type { NextFunction, Request, Response } from 'express'
import jwt, { type JwtPayload } from 'jsonwebtoken'
import { HttpStatusCode } from '../constants/http'
import { MSGS_RESPONSES } from '../constants/msgs'
import { type JwtOtpVerificationResponse } from '../types/user.types'

export const authOTP = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.token as string
    const secretKey = process?.env?.SECRET_KEY_OTP_JWT as string

    if (typeof secretKey === 'string') {
      const { userId, otpHash } = jwt.verify(token, secretKey) as JwtPayload &
        JwtOtpVerificationResponse

      req.userId = userId
      req.otpHash = otpHash
    }

    next()
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        expiredToken: true,
        msg: MSGS_RESPONSES.TOKEN_EXPIRED
      })
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        msg: `${error.message} 😭😭😭`
      })
    }

    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      msg: MSGS_RESPONSES.INTERNAL_SERVER_ERROR
    })
  }
}
