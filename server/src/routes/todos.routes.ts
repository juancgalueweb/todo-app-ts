import { Router } from 'express'
import {
  addTodo,
  deleteCompletedTodos,
  deleteTodo,
  getTodosByUser,
  updateTodo
} from '../controllers/todos.controller'
import { authApp } from '../middleware/authApp'
import { extractToken } from '../middleware/extractToken'
import { validateUser } from '../middleware/validateUser'

export const todoRouter: Router = Router()

todoRouter.get(
  '/todos/user',
  extractToken,
  authApp,
  validateUser,
  getTodosByUser
)
todoRouter.post('/todo', extractToken, authApp, validateUser, addTodo)
todoRouter.put('/todo/:id', extractToken, authApp, validateUser, updateTodo)
todoRouter.delete('/todo/:id', extractToken, authApp, validateUser, deleteTodo)
todoRouter.delete(
  '/todos/completed',
  extractToken,
  authApp,
  validateUser,
  deleteCompletedTodos
)
