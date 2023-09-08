import { HttpStatusCode } from '../constants/http'
import { MSGS_RESPONSES } from '../constants/msgs'
import TodoModel from '../models/todo.model'
import UserModel from '../models/user.model'
import type {
  AddTodoBody,
  DeleteResult,
  IAddTodo,
  IDeleteOrUpdateTodo,
  IDeleteTodos,
  IGetTodos,
  ITodo
} from '../types/todo'

export const getTodosService = async (
  userId: string | undefined
): Promise<IGetTodos> => {
  try {
    // Check if user exists in the databse
    const user = await UserModel.findById(userId)
    if (user === null) {
      return {
        success: false,
        statusCode: HttpStatusCode.NOT_FOUND,
        msg: MSGS_RESPONSES.GET_TODOS_USER_CHECK
      }
    }

    // Fetch all the todos for the given user
    const allTodos: ITodo[] = await TodoModel.find({
      userId
    })

    // Send the response with all the fetched todos
    return {
      success: true,
      statusCode: HttpStatusCode.OK,
      msg: MSGS_RESPONSES.GET_TODOS_OK,
      todos: allTodos
    }
  } catch (error) {
    // Handle any errors that occur during the process
    return {
      success: false,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      msg: MSGS_RESPONSES.GET_TODOS_ERROR
    }
  }
}

export const addTodoService = async (
  userId: string | undefined,
  body: AddTodoBody
): Promise<IAddTodo> => {
  try {
    // Check if user exists in the databse
    const user = await UserModel.findById(userId)
    if (user === null) {
      return {
        success: false,
        statusCode: HttpStatusCode.NOT_FOUND,
        msg: MSGS_RESPONSES.GET_TODOS_USER_CHECK
      }
    }

    // Create the new todo and retrieve all todos for the user
    const newTodo: ITodo = await TodoModel.create({ ...body, userId })
    const allTodos: ITodo[] = await TodoModel.find({ userId })

    return {
      success: true,
      msg: MSGS_RESPONSES.ADD_TODO_OK,
      statusCode: HttpStatusCode.CREATED,
      todo: newTodo,
      todos: allTodos
    }
  } catch (error) {
    return {
      success: false,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      msg: MSGS_RESPONSES.ADD_TODO_ERROR
    }
  }
}

export const deleteTodoService = async (
  id: string,
  userId: string | undefined
): Promise<IDeleteOrUpdateTodo> => {
  try {
    // Check if user exists in the databse
    const user = await UserModel.findById(userId)
    if (user === null) {
      return {
        success: false,
        statusCode: HttpStatusCode.NOT_FOUND,
        msg: MSGS_RESPONSES.GET_TODOS_USER_CHECK
      }
    }

    // Check if todo item exists
    const todoToBeDeleted: ITodo | null = await TodoModel.findById({ _id: id })
    if (todoToBeDeleted === null) {
      return {
        success: false,
        statusCode: HttpStatusCode.NOT_FOUND,
        msg: MSGS_RESPONSES.DELETE_TODO_CHECK_EXISTENCE
      }
    }

    // Delete item
    const deletedTodo: ITodo | null = await TodoModel.findByIdAndRemove(id)

    return {
      success: true,
      statusCode: HttpStatusCode.OK,
      msg: MSGS_RESPONSES.DELETE_TODO_OK,
      todo: deletedTodo
    }
  } catch (error) {
    return {
      success: false,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      msg: MSGS_RESPONSES.DELETE_TODO_ERROR
    }
  }
}

export const deleteCompletedTodosService = async (
  userId: string | undefined,
  idsToDelete: string[]
): Promise<IDeleteTodos> => {
  try {
    // Check if user exists in the databse
    const user = await UserModel.findById(userId)
    if (user === null) {
      return {
        success: false,
        statusCode: HttpStatusCode.NOT_FOUND,
        msg: MSGS_RESPONSES.GET_TODOS_USER_CHECK
      }
    }

    // Check if todo items exist
    const todosToBeDeleted: ITodo[] = await TodoModel.find({
      _id: { $in: idsToDelete },
      userId
    })
    if (todosToBeDeleted.length === 0) {
      return {
        success: false,
        statusCode: HttpStatusCode.NOT_FOUND,
        msg: MSGS_RESPONSES.DELETE_COMPLETED_TODOS_CHECK_EXISTENCE
      }
    }

    // Delete items
    const deletedTodos: DeleteResult = await TodoModel.deleteMany({
      _id: { $in: idsToDelete },
      userId
    })

    return {
      success: true,
      statusCode: HttpStatusCode.OK,
      msg: MSGS_RESPONSES.DELETE_COMPLETED_TODOS_OK,
      deletedTodos
    }
  } catch (error) {
    return {
      success: false,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      msg: MSGS_RESPONSES.DELETE_COMPLETED_TODOS_ERROR
    }
  }
}

export const updateTodoService = async (
  userId: string | undefined,
  id: string,
  body: ITodo
): Promise<IDeleteOrUpdateTodo> => {
  try {
    // Check if user exists in the databse
    const user = await UserModel.findById(userId)
    if (user === null) {
      return {
        success: false,
        statusCode: HttpStatusCode.NOT_FOUND,
        msg: MSGS_RESPONSES.GET_TODOS_USER_CHECK
      }
    }

    // Check if todo item exists
    const todoToBeUpdated: ITodo | null = await TodoModel.findById({ _id: id })
    if (todoToBeUpdated === null) {
      return {
        success: false,
        statusCode: HttpStatusCode.NOT_FOUND,
        msg: MSGS_RESPONSES.UPDATE_TODO_CHECK_EXISTENCE
      }
    }

    // Update the todo item
    const updatedTodo: ITodo | null = await TodoModel.findByIdAndUpdate(
      { _id: id },
      body,
      { new: true, runValidators: true }
    )

    return {
      success: true,
      msg: MSGS_RESPONSES.UPDATE_TODO_OK,
      statusCode: HttpStatusCode.OK,
      todo: updatedTodo
    }
  } catch (error) {
    return {
      success: false,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      msg: MSGS_RESPONSES.UPDATE_TODO_ERROR
    }
  }
}
