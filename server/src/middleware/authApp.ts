import type { NextFunction, Request, Response } from 'express'
import jwt, { type JwtPayload } from 'jsonwebtoken'
import { HttpStatusCode } from '../constants/http'
import { MSGS_RESPONSES } from '../constants/msgs'
import { type JwtTokenAppVerificationResponse } from '../types/user.types'

export const authApp = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.token as string
    const secretKey = process?.env?.SECRET_KEY_APP_USE_JWT as string

    const { userId } = jwt.verify(token, secretKey) as JwtPayload &
      JwtTokenAppVerificationResponse

    req.userId = userId

    next()
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        expiredToken: true,
        msg: MSGS_RESPONSES.MIDDLEWARE_EXPIRED_TOKEN
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
