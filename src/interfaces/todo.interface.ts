import type { FormInstance } from 'antd/es/form'
import { type Dayjs } from 'dayjs'
import { type Dispatch, type SetStateAction } from 'react'
import { type TODO_FILTERS } from '../constants/const'

export interface ITodo {
  _id?: string
  title: string
  priority: string
  completed: boolean
  deadline: Date | Dayjs
  createdAt?: Date
  updatedAt?: Date
  __v?: number
}

export type TodoId = Pick<ITodo, '_id'>
export type TodoSave = Pick<ITodo, 'title' | 'priority' | 'deadline'>
export type TodoIdAndCompleted = Pick<ITodo, '_id' | 'completed'>
export type TodoUpdateType = Pick<
  ITodo,
  '_id' | 'title' | 'priority' | 'deadline'
>

export type FilterValue = (typeof TODO_FILTERS)[keyof typeof TODO_FILTERS]

/**
 * Represents the shape of the TodoContext.
 */
export interface TodoContextType {
  todos: ITodo[]
  saveTodo: ({ title, priority, deadline }: TodoSave) => void
  removeTodo: ({ _id }: TodoId) => void
  updateCompletedStatus: ({ _id, completed }: TodoIdAndCompleted) => void
  updateTodo: ({ _id, title, priority, deadline }: TodoUpdateType) => void
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
  name: string
  modalTitle: string
}

export enum TaskStatus {
  completed = 'Completado',
  pending = 'Pendiente'
}
