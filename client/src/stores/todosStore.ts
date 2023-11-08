import type { AxiosError, AxiosResponse } from 'axios'
import { create } from 'zustand'
import {
  axiosWithToken,
  axiosWithTokenAndData,
  axiosWithTokenDeleteCompleted
} from '../api/axios'
import { handleError } from '../helpers/axiosErrorHandler'
import { type ITag } from '../interfaces/tags.interface'
import { type ITodosStore } from '../interfaces/todo.interface'
import { useTagsStore } from './tagsStore'

export const useTodosStore = create<ITodosStore>((set, get) => ({
  todos: [],
  loading: false,
  getTodos: () => {
    set({ loading: true })
    axiosWithToken('GET', 'todos/user')
      .then((response: AxiosResponse) => {
        const { todos } = response.data
        set({ todos })
      })
      .catch((error: AxiosError) => {
        handleError(error)
      })
      .finally(() => {
        set({ loading: false })
      })
  },
  saveTodo: ({ title, priority, deadline, tags }) => {
    set({ loading: true })
    if (title.length === 0) return
    const isNumberString = (str: string): boolean => /^[0-9]+$/.test(str)
    if (isNumberString(title)) return
    const dataToAxios = {
      data: {
        title,
        priority,
        deadline,
        tags
      }
    }
    axiosWithTokenAndData('POST', 'todo', dataToAxios)
      .then((response: AxiosResponse) => {
        const currentTodos = get().todos
        const { todo } = response?.data
        set({ todos: [...currentTodos, todo] })
      })
      .catch((error: AxiosError) => {
        handleError(error)
      })
      .finally(() => {
        set({ loading: false })
      })
  },
  removeTodo: ({ _id }) => {
    set({ loading: true })
    axiosWithToken('DELETE', `todo/${_id}`)
      .then((response: AxiosResponse) => {
        const { success } = response.data
        if (success) {
          const currentTodos = get().todos
          const todosAfterDeleteOne = currentTodos.filter(
            (todo) => todo._id !== _id
          )
          set({ todos: todosAfterDeleteOne })
        }
      })
      .catch((error: AxiosError) => {
        handleError(error)
      })
      .finally(() => {
        set({ loading: false })
      })
  },
  updateCompletedStatus: ({ _id, completed }) => {
    set({ loading: true })
    if (_id != null) {
      const dataToAxios = {
        data: {
          completed
        }
      }
      axiosWithTokenAndData('PUT', `todo/${_id}`, dataToAxios)
        .then((response: AxiosResponse) => {
          const { success } = response.data
          if (success) {
            const currentTodos = get().todos
            const todosAfterUpdate = currentTodos.map((todo) => {
              if (todo._id === _id) {
                return { ...todo, completed }
              }
              return todo
            })
            set({ todos: todosAfterUpdate })
          }
        })
        .catch((error: AxiosError) => {
          handleError(error)
        })
        .finally(() => {
          set({ loading: false })
        })
    }
  },
  updateTodo: ({ _id, title, priority, deadline, tags }) => {
    set({ loading: true })
    if (_id != null) {
      const dataToAxios = {
        data: {
          title,
          priority,
          deadline,
          tags
        }
      }
      const tagsStore = useTagsStore.getState()
      axiosWithTokenAndData('PUT', `todo/${_id}`, dataToAxios)
        .then((response: AxiosResponse) => {
          const { success } = response?.data
          if (success) {
            const currentTodos = get().todos
            const updatedTodos = currentTodos.map((todo) => {
              if (todo._id === _id) {
                // Mapear los IDs a objetos ITag
                const updatedTags = tags.map((tagId) => {
                  const foundTag = tagsStore.tags.find(
                    (tag: ITag) => tag._id === tagId
                  )
                  return Array.isArray(foundTag) ? foundTag[0] : foundTag
                })
                return { ...todo, title, priority, deadline, tags: updatedTags }
              } else {
                return todo
              }
            })
            set({ todos: updatedTodos })
          }
        })
        .catch((error: AxiosError) => {
          handleError(error)
        })
        .finally(() => {
          set({ loading: false })
        })
    }
  },
  removeAllCompleted: () => {
    set({ loading: true })
    const idsToDelete: string[] = get()
      .todos.filter((todo) => todo.completed)
      .map((todo) => todo._id)
      .filter((id): id is string => typeof id === 'string')
    axiosWithTokenDeleteCompleted('DELETE', 'todos/completed', idsToDelete)
      .then((response: AxiosResponse) => {
        const { success } = response?.data
        if (success) {
          const remainingTodos = get().todos.filter((todo) => !todo.completed)
          set({ todos: remainingTodos })
        }
      })
      .catch((error: AxiosError) => {
        handleError(error)
      })
      .finally(() => {
        set({ loading: false })
      })
  }
}))
