import type { FormInstance } from 'antd/es/form'
import { type Dispatch, type SetStateAction } from 'react'
import { type TODO_FILTERS } from '../constants/const'

export interface ITodo {
  // key?: React.Key
  _id?: string
  title: string
  priority: string
  completed: boolean
  deadline: Date
  createdAt?: string
  updatedAt?: string
  __v?: number
}

export type TodoId = Pick<ITodo, '_id'>
export type TodoSave = Pick<ITodo, 'title' | 'priority' | 'deadline'>
export type TodoIdAndCompleted = Pick<ITodo, '_id' | 'completed'>
export type TodoIdAndTitle = Pick<ITodo, '_id' | 'title'>

export type FilterValue = (typeof TODO_FILTERS)[keyof typeof TODO_FILTERS]

/**
 * Represents the shape of the TodoContext.
 */
export interface TodoContextType {
  todos: ITodo[]
  saveTodo: ({ title, priority, deadline }: TodoSave) => void
  removeTodo: ({ _id }: TodoId) => void
  updateCompletedStatus: ({ _id, completed }: TodoIdAndCompleted) => void
  updateTodoTitle: ({ _id, title }: TodoIdAndTitle) => void
  removeAllCompleted: () => void
  getTodos: () => void
  setTodos: Dispatch<SetStateAction<ITodo[]>>
  loading: boolean
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
  msg: string
  todos: ITodo[]
  success: boolean
}

export enum SpaPriority {
  alta = 'Alta',
  media = 'Media',
  baja = 'Baja'
}

export enum EngPriority {
  high = 'high',
  medium = 'medium',
  low = 'low'
}

export interface TodoModalProps {
  open: boolean
  onCancel: () => void
  onOk: () => void
  initialValues: {
    title: string
    priority: string
    deadline: Date | null
  }
  onFinish: (values: TodoSave) => void
  formRef: React.MutableRefObject<FormInstance<any> | null>
  form: FormInstance
}

export enum TaskStatus {
  completed = 'Completado',
  pending = 'Pendiente'
}
