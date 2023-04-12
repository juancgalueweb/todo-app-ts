import { type TODO_FILTERS } from '../constants/const'

export interface ITodo {
  _id: string
  title: string
  completed: boolean
  createdAt?: string
  updatedAt?: string
}

export type TodoId = Pick<ITodo, '_id'>
export type TodoTitle = Pick<ITodo, 'title'>
export type TodoIdAndCompleted = Pick<ITodo, '_id' | 'completed'>
export type TodoIdAndTitle = Pick<ITodo, '_id' | 'title'>

export type FilterValue = (typeof TODO_FILTERS)[keyof typeof TODO_FILTERS]

/**
 * Represents the shape of the TodoContext.
 */
export interface TodoContextType {
  todos: ITodo[]
  saveTodo: ({ title }: TodoTitle) => void
  removeTodo: ({ _id }: TodoId) => void
  updateCompletedStatus: ({ _id, completed }: TodoIdAndCompleted) => void
  removeAllCompleted: () => void
  updateTodoTitle: ({ _id, title }: TodoIdAndTitle) => void
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

export interface ApiDataTodosByUser {
  todos: ITodo[]
  success: boolean
}

export interface ApiDataType {
  message: string
  todo: ITodo
  todos: ITodo[]
  success: boolean
}
