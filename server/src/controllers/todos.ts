import { type Request, type Response } from 'express'
import TodoModel from '../models/todo'
import { type ITodo } from '../types/todo'

// Get all the tasks
const getTodosByUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { userId }
    } = req
    const todos: ITodo[] = await TodoModel.find({
      userId
    })
    res.status(200).json({ todos, success: true })
  } catch (error) {
    res
      .status(500)
      .json({ msg: 'Error when getting all todos', success: false })
  }
}

// Add a new todo
const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<
      ITodo,
      'title' | 'id' | 'completed' | 'userId'
    >
    const {
      params: { userId }
    } = req
    const newTodo: ITodo = await TodoModel.create(body)
    const allTodos: ITodo[] = await TodoModel.find({ userId })

    res.status(201).json({
      message: 'Todo added',
      todo: newTodo,
      todos: allTodos,
      success: true
    })
  } catch (error) {
    res.status(500).json({ msg: 'Error when creating a todo', success: false })
  }
}

// Update a todo
const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { userId, id },
      body
    } = req
    const updatedTodo: ITodo | null = await TodoModel.findByIdAndUpdate(
      { _id: id },
      body,
      { new: true, runValidators: true }
    )
    const allTodos: ITodo[] = await TodoModel.find({ userId })
    res.status(200).json({
      message: 'Todo updated',
      todo: updatedTodo,
      todos: allTodos,
      success: true
    })
  } catch (error) {
    res.status(500).json({ msg: 'Error when updating a todo', success: false })
  }
}

// Delete a todo
const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { userId, id }
    } = req
    const deletedTodo: ITodo | null = await TodoModel.findByIdAndRemove(id)
    const allTodos: ITodo[] = await TodoModel.find({ userId })
    res.status(200).json({
      message: 'Todo deleted',
      todo: deletedTodo,
      todos: allTodos,
      success: true
    })
  } catch (error) {
    res.status(500).json({ msg: 'Error when deleting a todo', success: false })
  }
}

export { getTodosByUser, addTodo, updateTodo, deleteTodo }
