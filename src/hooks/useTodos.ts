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
  type TodoSave,
  type TodoUpdateType
} from '../interfaces/todo.interface'

const isNumberString = (str: string): boolean => /^[0-9]+$/.test(str)

/**
 * A custom React hook that manages a list of to-do items.
 *
 * @returns An object containing functions for adding, removing, and updating to-dos, as well as the current list of to-dos.
 */
export function useTodos(): TodoContextType {
  /**
   * An array of to-do items that the hook manages.
   */
  const [todos, setTodos] = useState<ITodo[]>([])
  const [loading, setLoading] = useState<boolean>(false)
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
   * @param priority - The priority of the new to-do item.
   * @param deadline - The deadline of the new to-do item.
   */
  const saveTodo = ({ title, priority, deadline }: TodoSave): void => {
    if (title.length === 0) return
    if (isNumberString(title)) return

    setLoading(true)

    const dataToAxios = {
      data: {
        title,
        completed: false,
        priority,
        deadline
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
      .finally(() => {
        setLoading(false)
      })
  }

  /**
   * Removes a to-do item from the list.
   *
   * @param id - The ID of the to-do item to remove.
   */
  const removeTodo = ({ _id }: TodoId): void => {
    setLoading(true)
    if (_id != null) {
      axiosWithToken('DELETE', `todo/${_id}`)
        .then((response: AxiosResponse) => {
          const { success } = response.data
          if (success) {
            const todosAfterDeleteOne = todos.filter((todo) => todo._id !== _id)
            setTodos(todosAfterDeleteOne)
          }
        })
        .catch((error: AxiosError) => {
          handleError(error)
        })
        .finally(() => {
          setLoading(false)
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
    setLoading(true)
    if (_id != null) {
      const dataToAxios = {
        data: {
          completed
        }
      }
      axiosWithTokenAndData('PUT', `todo/${_id}`, dataToAxios)
        .then((response: AxiosResponse) => {
          const { success } = response?.data
          if (success) {
            const updatedTodos = todos.map((todo) => {
              if (todo._id === _id) {
                return { ...todo, completed }
              } else {
                return todo
              }
            })
            setTodos(updatedTodos)
          }
        })
        .catch((error: AxiosError) => {
          handleError(error)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  /**
   * Updates the title of a to-do item.
   *
   * @param id - The ID of the to-do item to update.
   * @param title - The new title of the to-do item.
   */
  const updateTodo = ({
    _id,
    title,
    priority,
    deadline
  }: TodoUpdateType): void => {
    setLoading(true)
    if (_id != null) {
      const dataToAxios = {
        data: {
          title,
          priority,
          deadline
        }
      }
      axiosWithTokenAndData('PUT', `todo/${_id}`, dataToAxios)
        .then((response: AxiosResponse) => {
          const { success } = response?.data
          if (success) {
            const updatedTodos = todos.map((todo) => {
              if (todo._id === _id) {
                return { ...todo, title, priority, deadline }
              } else {
                return todo
              }
            })
            setTodos(updatedTodos)
          }
        })
        .catch((error: AxiosError) => {
          handleError(error)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  /**
   * Removes all completed to-do items from the list.
   */
  const removeAllCompleted = (): void => {
    setLoading(true)
    const idsToDelete: string[] = todos
      .filter((todo) => todo.completed)
      .map((todo) => todo._id)
      .filter((id): id is string => typeof id === 'string')
    axiosWithTokenDeleteCompleted('DELETE', 'todos/completed', idsToDelete)
      .then((response: AxiosResponse) => {
        const { success } = response?.data
        if (success) {
          const remainingTodos = todos.filter((todo) => !todo.completed)
          setTodos(remainingTodos)
        }
      })
      .catch((error: AxiosError) => {
        handleError(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return {
    todos,
    loading,
    getTodos,
    saveTodo,
    setTodos,
    removeTodo,
    updateTodo,
    removeAllCompleted,
    updateCompletedStatus
  }
}
