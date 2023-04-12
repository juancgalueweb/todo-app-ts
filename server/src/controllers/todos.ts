import { type Request, type Response } from 'express'
import TodoModel from '../models/todo'
import UserModel from '../models/user'
import { type ITodo } from '../types/todo'

// Get all the tasks
const getTodosByUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract user ID from request parameters
    const { userId } = req.body

    // Check if user exists in the databse
    const user = await UserModel.findById(userId)
    if (user === null) {
      res.status(401).json({
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
    res.status(200).json({
      message: 'Búsqueda exitosa de las tareas',
      todos: allTodos,
      success: true
    })
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({
      msg: 'Error al traer todas las tareas del usuario',
      success: false
    })
  }
}

// Add a new todo
const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract todo information and user ID from request body and parameters
    const body = req.body as Pick<
      ITodo,
      'title' | 'id' | 'completed' | 'userId'
    >

    // Check if the user exists
    const user = await UserModel.findById(body.userId)
    if (user === null) {
      res.status(401).json({
        msg: 'No se puede añadir una tarea de un usuario que no existe',
        success: false
      })
      return
    }

    // Create the new todo and retrieve all todos for the user
    const newTodo: ITodo = await TodoModel.create(body)
    const allTodos: ITodo[] = await TodoModel.find({ userId: body.userId })

    // Return success response with new todo and all todos for the user
    res.status(201).json({
      message: 'Tarea agregada',
      todo: newTodo,
      todos: allTodos,
      success: true
    })
  } catch (error) {
    // Return error response if an error occurs
    res.status(500).json({ msg: 'Error al crear una tarea', success: false })
  }
}

// Update a todo
const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body
    } = req

    // Check if user exists
    const user = await UserModel.findById(body.userId)
    if (user === null) {
      res.status(401).json({
        msg: 'No se puede actualizar una tarea de un usuario que no existe',
        success: false
      })
      return
    }

    // Check if todo item exists
    const todoToBeUpdated: ITodo | null = await TodoModel.findById({ _id: id })
    if (todoToBeUpdated === null) {
      res.status(401).json({
        msg: 'No se puede actualizar una tarea que no existe',
        success: false
      })
      return
    }

    // Update the updated todo item and all the todos items for the user
    const updatedTodo: ITodo | null = await TodoModel.findByIdAndUpdate(
      { _id: id },
      body,
      { new: true, runValidators: true }
    )
    const allTodos: ITodo[] = await TodoModel.find({ userId: body.userId })

    // Return success response with updated todo and the rest of the todos for the user
    res.status(200).json({
      message: 'Tarea actualizada',
      todo: updatedTodo,
      todos: allTodos,
      success: true
    })
  } catch (error) {
    // Return error response if an error occurs
    res
      .status(500)
      .json({ msg: 'Error al actualizar una tarea', success: false })
  }
}

// Delete a todo
const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body
    } = req

    // Check if user exits
    const user = await UserModel.findById(body.userId)
    if (user === null) {
      res.status(401).json({
        msg: 'No se puede eliminar una tarea de un usuario que no existe',
        success: false
      })
      return
    }

    // Check if todo item exists
    const todoToBeDeleted: ITodo | null = await TodoModel.findById({ _id: id })
    if (todoToBeDeleted === null) {
      res.status(401).json({
        msg: 'No se puede eliminar una tarea que no existe',
        success: false
      })
      return
    }

    // Delete item and return the rest of the todos for the user
    const deletedTodo: ITodo | null = await TodoModel.findByIdAndRemove(id)
    const allTodos: ITodo[] = await TodoModel.find({ userId: body.userId })
    res.status(200).json({
      message: 'Tarea borrada',
      todo: deletedTodo,
      todos: allTodos,
      success: true
    })
  } catch (error) {
    res.status(500).json({ msg: 'Error al borrar una tarea', success: false })
  }
}

export { getTodosByUser, addTodo, updateTodo, deleteTodo }
