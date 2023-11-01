import type { NextFunction, Request, Response } from 'express'
import { HttpStatusCode } from '../constants/http'
import { MSGS_RESPONSES } from '../constants/msgs'

export const extractToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization
  const token = authHeader?.split(' ')[1]
  if (!token) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      success: false,
      msg: MSGS_RESPONSES.MIDDLEWARE_NO_TOKEN
    })
  }

  req.token = token
  next()
}
