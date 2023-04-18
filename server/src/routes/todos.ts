/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import {
  addTodo,
  deleteCompletedTodos,
  deleteTodo,
  getTodosByUser,
  updateTodo
} from '../controllers/todos'
import { validateJWT } from '../middleware/validateJWT'

const router: Router = Router()

router.get('/todos/user', validateJWT, getTodosByUser)
router.post('/todos', validateJWT, addTodo)
router.put('/todo/:id', validateJWT, updateTodo)
router.delete('/todo/:id', validateJWT, deleteTodo)
router.delete('/todos/completed', validateJWT, deleteCompletedTodos)

export default router
