import { type Request, type Response } from 'express'
import HttpStatusCode from '../constants/http'
import TodoModel from '../models/todo'
import UserModel from '../models/user'
import { type DeleteResult, type ITodo } from '../types/todo'

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
        msg: 'No se pueden encontrar las tareas de un usuario que no existe',
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
      msg: 'Búsqueda exitosa de las tareas',
      todos: allTodos,
      success: true
    })
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      msg: 'Error al traer todas las tareas del usuario',
      success: false
    })
  }
}

// Add a new todo
export const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract todo information and user ID from request body and parameters
    const body = req.body as Pick<ITodo, 'title' | 'completed'>
    const { userId } = req
    // Check if the user exists
    const user = await UserModel.findById(userId)
    if (user === null) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        msg: 'No se puede añadir una tarea de un usuario que no existe',
        success: false
      })
      return
    }
    // Create the new todo and retrieve all todos for the user
    const newTodo: ITodo = await TodoModel.create({ ...body, userId })
    const allTodos: ITodo[] = await TodoModel.find({ userId })

    // Return success response with new todo and all todos for the user
    res.status(HttpStatusCode.CREATED).json({
      msg: 'Tarea agregada',
      todo: newTodo,
      todos: allTodos,
      success: true
    })
  } catch (error) {
    // Return error response if an error occurs
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ msg: 'Error al crear una tarea', success: false })
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

    // Check if user exists
    const user = await UserModel.findById(userId)
    if (user === null) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        msg: 'No se puede actualizar una tarea de un usuario que no existe',
        success: false
      })
      return
    }

    // Check if todo item exists
    const todoToBeUpdated: ITodo | null = await TodoModel.findById({ _id: id })
    if (todoToBeUpdated === null) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        msg: 'No se puede actualizar una tarea que no existe',
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
      msg: 'Tarea actualizada',
      todo: updatedTodo,
      todos: allTodos,
      success: true
    })
  } catch (error) {
    // Return error response if an error occurs
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ msg: 'Error al actualizar una tarea', success: false })
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
        msg: 'No se puede eliminar una tarea de un usuario que no existe',
        success: false
      })
      return
    }

    // Check if todo item exists
    const todoToBeDeleted: ITodo | null = await TodoModel.findById({ _id: id })
    if (todoToBeDeleted === null) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        msg: 'No se puede eliminar una tarea que no existe',
        success: false
      })
      return
    }

    // Delete item and return the rest of the todos for the user
    const deletedTodo: ITodo | null = await TodoModel.findByIdAndRemove(id)
    const allTodos: ITodo[] = await TodoModel.find({ userId })
    res.status(HttpStatusCode.OK).json({
      msg: 'Tarea borrada',
      todo: deletedTodo,
      todos: allTodos,
      success: true
    })
  } catch (error) {
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ msg: 'Error al borrar una tarea', success: false })
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
        msg: 'No se pueden eliminar las tareas completadas de un usuario que no existe',
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
        msg: 'No se pueden eliminar tareas que no existen',
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
      msg: 'Tareas borradas',
      deletedTodos,
      todos: allTodos,
      success: true
    })
  } catch (error) {
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ msg: 'Error al borrar tareas', success: false })
  }
}
