import { type NextFunction, type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import HttpStatusCode from '../constants/http'
import { type JwtTokenAppVerificationResponse } from '../types/user'

/**
 * Middleware function that validates a JSON Web Token (JWT) included in the
 * request header.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function in the middleware chain.
 */
const validateJWT = (req: Request, res: Response, next: NextFunction): void => {
  // Get the token from the request header
  const token = req.header('x-token')
  if (token?.length === 0 || token === undefined || token === null) {
    res.status(HttpStatusCode.UNAUTHORIZED).json({
      success: false,
      msg: 'No hay token en la petición'
    })
  }

  try {
    // Verify the token using the secret key and extract the userId
    const { userId } = jwt.verify(
      token as string,
      process.env.SECRET_KEY_APP_USE_JWT as string
    ) as JwtTokenAppVerificationResponse
    // Add properties userId and userEmail to the req object
    req.userId = userId
    next()
  } catch (error) {
    // If the token is not valid or missing, send an error response to the client
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        msg: 'Su sesión ha expirado, por favor, inicie sesión nuevamente.'
      })
    } else {
      res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        msg: 'Token no válido'
      })
    }
  }
}

export { validateJWT }
