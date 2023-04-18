import { type AxiosError, type AxiosResponse } from 'axios'
import { useState } from 'react'
import { axiosWithToken, axiosWithTokenSaveAndEditTodo } from '../api/axios'
import {
  type ITodo,
  type TodoContextType,
  type TodoId,
  type TodoIdAndCompleted,
  type TodoIdAndTitle,
  type TodoTitle
} from '../interfaces/todo.interface'

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
  const [todos, setTodos] = useState<ITodo[]>([])

  /**
   * Get todos by userId
   */
  const getTodos = (): void => {
    axiosWithToken('GET', 'todos')
      .then((response: AxiosResponse) => {
        const { todos } = response.data
        setTodos(todos)
      })
      .catch((error: AxiosError) => {
        const errorData = error.response?.data
        if (
          typeof errorData === 'object' &&
          errorData !== null &&
          'msg' in errorData
        ) {
          const errorMessageFromAxios = errorData.msg as string
          console.log(errorMessageFromAxios)
        }
      })
  }

  /**
   * Adds a new to-do item to the list.
   *
   * @param title - The title of the new to-do item.
   */
  const saveTodo = ({ title }: TodoTitle): void => {
    if (title.length === 0) return
    if (isNumberString(title)) return

    const dataToAxios = {
      data: {
        title,
        completed: false
      }
    }
    axiosWithTokenSaveAndEditTodo('POST', 'add-todo', dataToAxios)
      .then((response: AxiosResponse) => {
        const { todos } = response?.data
        setTodos(todos)
      })
      .catch((error: AxiosError) => {
        const errorData = error.response?.data
        if (
          typeof errorData === 'object' &&
          errorData !== null &&
          'msg' in errorData
        ) {
          const errorMessageFromAxios = errorData.msg as string
          console.log(errorMessageFromAxios)
        }
      })
  }

  /**
   * Removes a to-do item from the list.
   *
   * @param id - The ID of the to-do item to remove.
   */
  const removeTodo = ({ _id }: TodoId): void => {
    axiosWithToken('DELETE', `delete-todo/${_id as string}`)
      .then((response: AxiosResponse) => {
        const { todos } = response.data
        setTodos(todos)
      })
      .catch((error: AxiosError) => {
        const errorData = error.response?.data
        if (
          typeof errorData === 'object' &&
          errorData !== null &&
          'msg' in errorData
        ) {
          const errorMessageFromAxios = errorData.msg as string
          console.log(errorMessageFromAxios)
        }
      })
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
    const todoToBeUpdated = todos.find(todo => todo._id === _id)
    const dataToAxios = {
      data: {
        title: todoToBeUpdated?.title as string,
        completed
      }
    }
    axiosWithTokenSaveAndEditTodo(
      'PUT',
      `edit-todo/${_id as string}`,
      dataToAxios
    )
      .then((response: AxiosResponse) => {
        const { todos } = response?.data
        setTodos(todos)
      })
      .catch((error: AxiosError) => {
        const errorData = error.response?.data
        if (
          typeof errorData === 'object' &&
          errorData !== null &&
          'msg' in errorData
        ) {
          const errorMessageFromAxios = errorData.msg as string
          console.log(errorMessageFromAxios)
        }
      })
  }

  /**
   * Updates the title of a to-do item.
   *
   * @param id - The ID of the to-do item to update.
   * @param title - The new title of the to-do item.
   */
  const updateTodoTitle = ({ _id, title }: TodoIdAndTitle): void => {
    const todoToBeUpdated = todos.find(todo => todo._id === _id)
    const dataToAxios = {
      data: {
        title,
        completed: todoToBeUpdated?.completed as boolean
      }
    }
    axiosWithTokenSaveAndEditTodo(
      'PUT',
      `edit-todo/${_id as string}`,
      dataToAxios
    )
      .then((response: AxiosResponse) => {
        const { todos } = response?.data
        setTodos(todos)
      })
      .catch((error: AxiosError) => {
        const errorData = error.response?.data
        if (
          typeof errorData === 'object' &&
          errorData !== null &&
          'msg' in errorData
        ) {
          const errorMessageFromAxios = errorData.msg as string
          console.log(errorMessageFromAxios)
        }
      })
  }

  /**
   * Removes all completed to-do items from the list.
   */
  const removeAllCompleted = (): void => {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  return {
    todos,
    getTodos,
    saveTodo,
    setTodos,
    removeTodo,
    updateTodoTitle,
    removeAllCompleted,
    updateCompletedStatus
  }
}
