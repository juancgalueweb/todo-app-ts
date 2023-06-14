import { type AxiosError, type AxiosResponse } from 'axios'
import { useState } from 'react'
import {
  axiosWithToken,
  axiosWithTokenAndData,
  axiosWithTokenDeleteCompleted
} from '../api/axios'
import { handleError } from '../helpers/axiosErrorHandler'
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
    axiosWithToken('GET', 'todos/user')
      .then((response: AxiosResponse) => {
        const { todos } = response.data
        setTodos(todos)
      })
      .catch((error: AxiosError) => {
        handleError(error)
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
    axiosWithTokenAndData('POST', 'todos', dataToAxios)
      .then((response: AxiosResponse) => {
        const { todos } = response?.data
        setTodos(todos)
      })
      .catch((error: AxiosError) => {
        handleError(error)
      })
  }

  /**
   * Removes a to-do item from the list.
   *
   * @param id - The ID of the to-do item to remove.
   */
  const removeTodo = ({ _id }: TodoId): void => {
    if (_id != null) {
      axiosWithToken('DELETE', `todo/${_id}`)
        .then((response: AxiosResponse) => {
          const { todos } = response.data
          setTodos(todos)
        })
        .catch((error: AxiosError) => {
          handleError(error)
        })
    }
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
    if (_id != null) {
      const todoToBeUpdated = todos.find(todo => todo._id === _id)
      if (typeof todoToBeUpdated?.title === 'string') {
        const dataToAxios = {
          data: {
            title: todoToBeUpdated?.title,
            completed
          }
        }
        axiosWithTokenAndData('PUT', `todo/${_id}`, dataToAxios)
          .then((response: AxiosResponse) => {
            const { todos } = response?.data
            setTodos(todos)
          })
          .catch((error: AxiosError) => {
            handleError(error)
          })
      }
    }
  }

  /**
   * Updates the title of a to-do item.
   *
   * @param id - The ID of the to-do item to update.
   * @param title - The new title of the to-do item.
   */
  const updateTodoTitle = ({ _id, title }: TodoIdAndTitle): void => {
    if (_id != null) {
      const todoToBeUpdated = todos.find(todo => todo._id === _id)
      if (typeof todoToBeUpdated?.completed === 'boolean') {
        const dataToAxios = {
          data: {
            title,
            completed: todoToBeUpdated?.completed
          }
        }
        axiosWithTokenAndData('PUT', `todo/${_id}`, dataToAxios)
          .then((response: AxiosResponse) => {
            const { todos } = response?.data
            setTodos(todos)
          })
          .catch((error: AxiosError) => {
            handleError(error)
          })
      }
    }
  }

  /**
   * Removes all completed to-do items from the list.
   */
  const removeAllCompleted = (): void => {
    const idsToDelete: string[] = todos
      .filter(todo => todo.completed)
      .map(todo => todo._id)
      .filter((id): id is string => typeof id === 'string')
    axiosWithTokenDeleteCompleted('DELETE', 'todos/completed', idsToDelete)
      .then((response: AxiosResponse) => {
        const { todos } = response?.data
        setTodos(todos)
      })
      .catch((error: AxiosError) => {
        handleError(error)
      })
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
