import { Router } from 'express'
import { verifyEmail } from '../controllers/user.controller'
import { authOTP } from '../middleware/authOTP'
import { extractToken } from '../middleware/extractToken'

export const verifyEmailRouter: Router = Router()

verifyEmailRouter.post('/verifyEmail', extractToken, authOTP, verifyEmail)
