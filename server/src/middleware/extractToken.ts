import type { NextFunction, Response } from 'express'
import type { AuthRequest } from '../../custom.d'
import { HttpStatusCode } from '../constants/http'
import { MSGS_RESPONSES } from '../constants/msgs'

export const extractToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const { authorization } = req.headers
  const token = authorization?.split(' ')[1]
  if (!token) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      success: false,
      msg: MSGS_RESPONSES.TOKEN_NOT_FOUND
    })
    return
  }

  req.token = token
  next()
}
