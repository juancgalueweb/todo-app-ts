import { Router } from 'express'
import { createUser, verifyEmail } from '../controllers/user.controller'
import { auth } from '../middleware/auth'
import { extractToken } from '../middleware/extractToken'

export const userRouter: Router = Router()

userRouter.post('/auth/createUser', createUser)
userRouter.post('/auth/verifyEmail', extractToken, auth, verifyEmail)
