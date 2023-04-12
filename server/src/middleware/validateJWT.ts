import { type NextFunction, type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import { type JwtTokenAppVerificationResponse } from '../types/user'

const validateJWT = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('x-token')
  try {
    const { userId, userEmail } = jwt.verify(
      token as string,
      process.env.SECRET_KEY_APP_USE_JWT as string
    ) as JwtTokenAppVerificationResponse
    req.userId = userId
    req.userEmail = userEmail
    next()
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        success: false,
        msg: `Error de jsonwebtoken: ${error.message}`
      })
    } else {
      res.status(401).json({
        success: false,
        msg: 'Token no válido'
      })
    }
  }
}

export { validateJWT }
