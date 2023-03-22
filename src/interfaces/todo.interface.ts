import { type TODO_FILTERS } from '../const'

export interface ITodo {
  id: string
  title: string
  completed: boolean
}

export type TodoId = Pick<ITodo, 'id'>
export type TodoIdAndCompleted = Pick<ITodo, 'id' | 'completed'>

export type FilterValue = (typeof TODO_FILTERS)[keyof typeof TODO_FILTERS]
