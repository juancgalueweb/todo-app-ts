import { type TODO_FILTERS } from '../const'

export interface ITodo {
  id: string
  title: string
  completed: boolean
}

export type TodoId = Pick<ITodo, 'id'>
export type TodoTitle = Pick<ITodo, 'title'>
export type TodoIdAndCompleted = Pick<ITodo, 'id' | 'completed'>

export type FilterValue = (typeof TODO_FILTERS)[keyof typeof TODO_FILTERS]

export interface TodoContextType {
  todos: ITodo[]
  saveTodo: ({ title }: TodoTitle) => void
  removeTodo: ({ id }: TodoId) => void
  updateCompletedStatus: ({ id, completed }: TodoIdAndCompleted) => void
  removeAllCompleted: () => void
}

export interface FiltersContextType {
  filterChange: (filter: FilterValue) => void
  activeCount: number
  completedCount: number
  filteredTodos: ITodo[]
  filterSelected: FilterValue
}
