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

router.get('/api/todos/user', validateJWT, getTodosByUser)
router.post('/api/todos', validateJWT, addTodo)
router.put('/api/todo/:id', validateJWT, updateTodo)
router.delete('/api/todo/:id', validateJWT, deleteTodo)
router.delete('/api/todos/completed', validateJWT, deleteCompletedTodos)

export default router
