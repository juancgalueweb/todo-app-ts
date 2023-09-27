import { Router } from 'express'
import {
  addTodo,
  deleteCompletedTodos,
  deleteTodo,
  getTodosByUser,
  updateTodo
} from '../controllers/todos.controller'
import { validateJWT } from '../middleware/validateJWT'
import { validateUser } from '../middleware/validateUser'

export const todoRouter: Router = Router()

todoRouter.get('/todos/user', validateJWT, validateUser, getTodosByUser)
todoRouter.post('/todo', validateJWT, validateUser, addTodo)
todoRouter.put('/todo/:id', validateJWT, validateUser, updateTodo)
todoRouter.delete('/todo/:id', validateJWT, validateUser, deleteTodo)
todoRouter.delete(
  '/todos/completed',
  validateJWT,
  validateUser,
  deleteCompletedTodos
)
