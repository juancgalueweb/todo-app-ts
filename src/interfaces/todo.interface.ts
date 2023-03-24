import { type TODO_FILTERS } from '../constants/const'

export interface ITodo {
  id: string
  title: string
  completed: boolean
}

export type TodoId = Pick<ITodo, 'id'>
export type TodoTitle = Pick<ITodo, 'title'>
export type TodoIdAndCompleted = Pick<ITodo, 'id' | 'completed'>

export type FilterValue = (typeof TODO_FILTERS)[keyof typeof TODO_FILTERS]

/**
 * Represents the shape of the TodoContext.
 */
export interface TodoContextType {
  todos: ITodo[]
  saveTodo: ({ title }: TodoTitle) => void
  removeTodo: ({ id }: TodoId) => void
  updateCompletedStatus: ({ id, completed }: TodoIdAndCompleted) => void
  removeAllCompleted: () => void
}

/**
 * Represents the shape of the FiltersContext.
 */
export interface FiltersContextType {
  filterChange: (filter: FilterValue) => void
  activeCount: number
  completedCount: number
  filteredTodos: ITodo[]
  filterSelected: FilterValue
}
