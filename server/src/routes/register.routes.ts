import { Router } from 'express'
import { registerUser } from '../controllers/user.controller'

export const registerUserRouter: Router = Router()

registerUserRouter.post('/registerUser', registerUser)
