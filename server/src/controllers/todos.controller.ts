import { type Request, type Response } from 'express'
import {
  addTodoService,
  deleteCompletedTodosService,
  deleteTodoService,
  getTodosService,
  updateTodoService
} from '../services/todos.services'

// Get all the tasks
export const getTodosByUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req
  const { success, statusCode, msg, todos } = await getTodosService(userId)

  res.status(statusCode).json({
    success,
    msg,
    todos
  })
}

// Add a new todo
export const addTodo = async (req: Request, res: Response): Promise<void> => {
  // Extract todo information and user ID from request body
  const { userId, body } = req

  const { statusCode, msg, todo, todos, success } = await addTodoService(
    userId,
    body
  )

  res.status(statusCode).json({
    success,
    msg,
    todo,
    todos
  })
}

// Delete a todo
export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    params: { id },
    userId
  } = req

  const { statusCode, success, msg, todo } = await deleteTodoService(id, userId)

  res.status(statusCode).json({
    success,
    msg,
    todo
  })
}

// Delete all completed todos
export const deleteCompletedTodos = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, body: idsToDelete } = req

  const { success, msg, deletedTodos, statusCode } =
    await deleteCompletedTodosService(userId, idsToDelete)

  res.status(statusCode).json({
    success,
    msg,
    deletedTodos
  })
}

// Update a todo
export const updateTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    params: { id },
    userId
  } = req

  const { statusCode, msg, success, todo } = await updateTodoService(
    userId,
    id,
    req.body
  )

  res.status(statusCode).json({
    success,
    msg,
    todo
  })
}
