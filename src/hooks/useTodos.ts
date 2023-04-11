import React from 'react'
import {
  type ITodo,
  type TodoContextType,
  type TodoId,
  type TodoIdAndCompleted,
  type TodoIdAndTitle,
  type TodoTitle
} from '../interfaces/todo.interface'

const initialState = [
  {
    _id: '1',
    title: 'Ver el twitch de Midudev',
    completed: true
  },
  {
    _id: '2',
    title: 'Estudiar Scrum Fundamentals',
    completed: false
  },
  {
    _id: '3',
    title: 'Llamar a Wells Fargo',
    completed: false
  }
]

type Props = TodoContextType

const isNumberString = (str: string): boolean => /^[0-9]+$/.test(str)

/**
 * A custom React hook that manages a list of to-do items.
 *
 * @returns An object containing functions for adding, removing, and updating to-dos, as well as the current list of to-dos.
 */
export function useTodos(): Props {
  /**
   * An array of to-do items that the hook manages.
   */
  const [todos, setTodos] = React.useState<ITodo[]>(initialState)

  /**
   * Adds a new to-do item to the list.
   *
   * @param title - The title of the new to-do item.
   */
  const saveTodo = ({ title }: TodoTitle): void => {
    if (title.length === 0) return
    if (isNumberString(title)) return

    const newTodo = {
      title,
      _id: crypto.randomUUID(), //! Revisar esto, porque el id lo genera la base de datos
      completed: false
    }
    const newTodos = [...todos, newTodo]
    setTodos(newTodos)
  }

  /**
   * Removes a to-do item from the list.
   *
   * @param id - The ID of the to-do item to remove.
   */
  const removeTodo = ({ _id }: TodoId): void => {
    const newTodos = todos.filter(todo => todo._id !== _id)
    setTodos(newTodos)
  }

  /**
   * Updates the completion status of a to-do item.
   *
   * @param id - The ID of the to-do item to update.
   * @param completed - The new completion status of the to-do item.
   */
  const updateCompletedStatus = ({
    _id,
    completed
  }: TodoIdAndCompleted): void => {
    const newTodos = todos.map(todo => {
      if (todo._id === _id) {
        return {
          ...todo,
          completed
        }
      }
      return todo
    })
    setTodos(newTodos)
  }

  /**
   * Updates the title of a to-do item.
   *
   * @param id - The ID of the to-do item to update.
   * @param title - The new title of the to-do item.
   */
  const updateTodoTitle = ({ _id, title }: TodoIdAndTitle): void => {
    const newTodos = todos.map(todo => {
      if (todo._id === _id) {
        return { ...todo, title }
      }
      return todo
    })
    setTodos(newTodos)
  }

  /**
   * Removes all completed to-do items from the list.
   */
  const removeAllCompleted = (): void => {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  return {
    removeAllCompleted,
    updateCompletedStatus,
    removeTodo,
    saveTodo,
    todos,
    updateTodoTitle
  }
}
