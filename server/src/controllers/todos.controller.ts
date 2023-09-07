import { type Request, type Response } from 'express'
import { HttpStatusCode } from '../constants/http'
import { MSGS_RESPONSES } from '../constants/msgs'
import TodoModel from '../models/todo.model'
import UserModel from '../models/user.model'
import {
  addTodoService,
  deleteCompletedTodosService,
  deleteTodoService,
  getTodosService
} from '../services/todos.services'
import { type ITodo } from '../types/todo'

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
  try {
    const {
      params: { id },
      userId
    } = req

    // Check if user exists
    const user = await UserModel.findById(userId)
    if (user === null) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        msg: MSGS_RESPONSES.UPDATE_TODO_USER_CHECK,
        success: false
      })
      return
    }

    // Check if todo item exists
    const todoToBeUpdated: ITodo | null = await TodoModel.findById({ _id: id })
    if (todoToBeUpdated === null) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        msg: MSGS_RESPONSES.UPDATE_TODO_CHECK_EXISTENCE,
        success: false
      })
      return
    }

    // Update the todo item
    const updatedTodo: ITodo | null = await TodoModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true, runValidators: true }
    )

    // Return success response with updated todo
    res.status(HttpStatusCode.OK).json({
      msg: MSGS_RESPONSES.UPDATE_TODO_OK,
      todo: updatedTodo,
      success: true
    })
  } catch (error) {
    // Return error response if an error occurs
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ msg: MSGS_RESPONSES.UPDATE_TODO_ERROR, success: false })
  }
}
