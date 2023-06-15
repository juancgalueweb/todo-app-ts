import { type Request, type Response } from 'express'
import { HttpStatusCode } from '../constants/http'
import { MSGS_RESPONSES } from '../constants/msgs'
import TodoModel from '../models/todo'
import UserModel from '../models/user'
import { type AddTodoBody, type DeleteResult, type ITodo } from '../types/todo'

// Get all the tasks
export const getTodosByUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req

    // Check if user exists in the databse
    const user = await UserModel.findById(userId)
    if (user === null) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        msg: MSGS_RESPONSES.GET_TODOS_USER_CHECK,
        success: false
      })
      return
    }

    // Fetch all the todos for the given user
    const allTodos: ITodo[] = await TodoModel.find({
      userId
    })

    // Send the response with all the fetched todos
    res.status(HttpStatusCode.OK).json({
      msg: MSGS_RESPONSES.GET_TODOS_OK,
      todos: allTodos,
      success: true
    })
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      msg: MSGS_RESPONSES.GET_TODOS_ERROR,
      success: false
    })
  }
}

// Add a new todo
export const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract todo information and user ID from request body and parameters
    const body: AddTodoBody = req.body
    const { userId } = req
    // Check if the user exists
    const user = await UserModel.findById(userId)
    if (user === null) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        msg: MSGS_RESPONSES.ADD_TODO_USER_CHECK,
        success: false
      })
      return
    }
    // Create the new todo and retrieve all todos for the user
    const newTodo: ITodo = await TodoModel.create({ ...body, userId })
    const allTodos: ITodo[] = await TodoModel.find({ userId })

    // Return success response with new todo and all todos for the user
    res.status(HttpStatusCode.CREATED).json({
      msg: MSGS_RESPONSES.ADD_TODO_OK,
      todo: newTodo,
      todos: allTodos,
      success: true
    })
  } catch (error) {
    // Return error response if an error occurs
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ msg: MSGS_RESPONSES.ADD_TODO_ERROR, success: false })
  }
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

    // If title is empty, the task won't update, but will be deleted.
    // In the front-end, when title === '', the deleteTodo function is called
    if (req.body.title === '') {
      return
    }

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

    // Update the todo item and get all the todos items for the user
    const updatedTodo: ITodo | null = await TodoModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true, runValidators: true }
    )
    const allTodos: ITodo[] = await TodoModel.find({ userId })

    // Return success response with updated todo and the rest of the todos for the user
    res.status(HttpStatusCode.OK).json({
      msg: MSGS_RESPONSES.UPDATE_TODO_OK,
      todo: updatedTodo,
      todos: allTodos,
      success: true
    })
  } catch (error) {
    // Return error response if an error occurs
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ msg: MSGS_RESPONSES.UPDATE_TODO_ERROR, success: false })
  }
}

// Delete a todo
export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      params: { id },
      userId
    } = req

    // Check if user exits
    const user = await UserModel.findById(userId)
    if (user === null) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        msg: MSGS_RESPONSES.DELETE_TODO_USER_CHECK,
        success: false
      })
      return
    }

    // Check if todo item exists
    const todoToBeDeleted: ITodo | null = await TodoModel.findById({ _id: id })
    if (todoToBeDeleted === null) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        msg: MSGS_RESPONSES.DELETE_TODO_CHECK_EXISTENCE,
        success: false
      })
      return
    }

    // Delete item and return the rest of the todos for the user
    const deletedTodo: ITodo | null = await TodoModel.findByIdAndRemove(id)
    const allTodos: ITodo[] = await TodoModel.find({ userId })
    res.status(HttpStatusCode.OK).json({
      msg: MSGS_RESPONSES.DELETE_TODO_OK,
      todo: deletedTodo,
      todos: allTodos,
      success: true
    })
  } catch (error) {
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ msg: MSGS_RESPONSES.DELETE_TODO_ERROR, success: false })
  }
}

export const deleteCompletedTodos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, body: ids } = req
    // Check if user exits
    const user = await UserModel.findById(userId)
    if (user === null) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        msg: MSGS_RESPONSES.DELETE_COMPLETED_TODOS_USER_CHECK,
        success: false
      })
      return
    }
    // Check if todo items exist
    const todosToBeDeleted: ITodo[] = await TodoModel.find({
      _id: { $in: ids },
      userId
    })
    if (todosToBeDeleted.length === 0) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        msg: MSGS_RESPONSES.DELETE_COMPLETED_TODOS_CHECK_EXISTENCE,
        success: false
      })
      return
    }

    // Delete items and return the rest of the todos for the user
    const deletedTodos: DeleteResult = await TodoModel.deleteMany({
      _id: { $in: ids },
      userId
    })
    const allTodos: ITodo[] = await TodoModel.find({ userId })
    res.status(HttpStatusCode.OK).json({
      msg: MSGS_RESPONSES.DELETE_COMPLETED_TODOS_OK,
      deletedTodos,
      todos: allTodos,
      success: true
    })
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      msg: MSGS_RESPONSES.DELETE_COMPLETED_TODOS_ERROR,
      success: false
    })
  }
}
