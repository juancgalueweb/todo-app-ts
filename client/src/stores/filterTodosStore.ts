import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { TODO_FILTERS } from '../constants/const'
import { type IFilterStore } from '../interfaces/todo.interface'
import { useTodosStore } from './todosStore'

export const useFilterTodos = create<IFilterStore>()(
  persist(
    (set, get) => {
      return {
        filterSelected: TODO_FILTERS.ALL,
        activeCount: 0,
        completedCount: 0,
        pageSize: 6,
        filteredTodos: [],
        filterChange: (filter) => {
          set({ filterSelected: filter })
        },
        setActiveCount: () => {
          const { todos } = useTodosStore.getState()
          const activeCount = todos.filter((todo) => !todo.completed).length
          set({ activeCount })
        },
        setCompletedCount: () => {
          const { todos } = useTodosStore.getState()
          const { activeCount } = get()
          const completedCount = todos.length - activeCount
          set({ completedCount })
        },
        setFilteredTodos: () => {
          const { todos } = useTodosStore.getState()
          const { filterSelected } = get()
          const filteredTodos = todos.filter((todo) => {
            if (filterSelected === TODO_FILTERS.PENDING) return !todo.completed
            if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
            return todo
          })
          set({ filteredTodos })
        },
        setPageSize: (pageSize: number) => {
          set({ pageSize })
        }
      }
    },
    { name: 'filter-todos-store' }
  )
)
