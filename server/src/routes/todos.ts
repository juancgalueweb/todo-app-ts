/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import {
  addTodo,
  deleteTodo,
  getTodosByUser,
  updateTodo
} from '../controllers/todos'
import { validateJWT } from '../middleware/validateJWT'

const router: Router = Router()

router.get('/todos/:userId', validateJWT, getTodosByUser)
router.post('/add-todo/:userId', validateJWT, addTodo)
router.put('/edit-todo/:userId/:id', validateJWT, updateTodo)
router.delete('/delete-todo/:userId/:id', validateJWT, deleteTodo)

export default router
