import { Router } from 'express'
import {
  deleteTag,
  getTagsByUser,
  saveTag,
  updateTag
} from '../controllers/tags.controller'
import { authApp } from '../middleware/authApp'
import { extractToken } from '../middleware/extractToken'
import { validateUser } from '../middleware/validateUser'

export const tagRouter: Router = Router()

tagRouter.post('/tag', extractToken, authApp, validateUser, saveTag)
tagRouter.get('/tags/user', extractToken, authApp, validateUser, getTagsByUser)
tagRouter.delete('/tag/:tagId', extractToken, authApp, validateUser, deleteTag)
tagRouter.put('/tag/:tagId', extractToken, authApp, validateUser, updateTag)
