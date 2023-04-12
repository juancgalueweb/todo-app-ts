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

router.get('/todos', validateJWT, getTodosByUser)
router.post('/add-todo', validateJWT, addTodo)
router.put('/edit-todo/:id', validateJWT, updateTodo)
router.delete('/delete-todo/:id', validateJWT, deleteTodo)

export default router
