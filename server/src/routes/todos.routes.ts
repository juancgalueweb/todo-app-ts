import { Router } from 'express'
import {
  addTodo,
  deleteCompletedTodos,
  deleteTodo,
  getTodosByUser,
  updateTodo
} from '../controllers/todos.controller'
import { validateJWT } from '../middleware/validateJWT'

export const todoRouter: Router = Router()

todoRouter.get('/todos/user', validateJWT, getTodosByUser)
todoRouter.post('/todo', validateJWT, addTodo)
todoRouter.put('/todo/:id', validateJWT, updateTodo)
todoRouter.delete('/todo/:id', validateJWT, deleteTodo)
todoRouter.delete('/todos/completed', validateJWT, deleteCompletedTodos)
