/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { createUser } from '../controllers/user'

const router: Router = Router()

router.post('/auth/createUser', createUser)

export default router
