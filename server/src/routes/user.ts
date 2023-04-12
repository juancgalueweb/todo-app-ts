/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { createUser, verifyEmail } from '../controllers/user'

const router: Router = Router()

router.post('/auth/createUser', createUser)
router.post('/auth/verifyEmail', verifyEmail)

export default router
