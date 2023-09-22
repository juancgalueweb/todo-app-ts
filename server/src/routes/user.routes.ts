import { Router } from 'express'
import { createUser, verifyEmail } from '../controllers/user.controller'

export const userRouter: Router = Router()

userRouter.post('/auth/createUser', createUser)
userRouter.post('/auth/verifyEmail', verifyEmail)
