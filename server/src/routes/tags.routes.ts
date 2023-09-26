import { Router } from 'express'
import { getTags, saveTag } from '../controllers/tags.controller'
import { validateJWT } from '../middleware/validateJWT'

export const tagRouter: Router = Router()

tagRouter.post('/tag', validateJWT, saveTag)
tagRouter.get('/tags/user', validateJWT, getTags)
