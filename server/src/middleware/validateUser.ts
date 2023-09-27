import { type NextFunction, type Request, type Response } from 'express'
import { HttpStatusCode } from '../constants/http'
import { MSGS_RESPONSES } from '../constants/msgs'
import UserModel from '../models/user.model'

export const validateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { userId } = req
  // Check if user exists in the databse
  const user = await UserModel.findById(userId)
  if (user === null) {
    res.status(HttpStatusCode.NOT_FOUND).json({
      success: false,
      msg: MSGS_RESPONSES.USER_NOT_FOUND
    })
  }
  next()
}
