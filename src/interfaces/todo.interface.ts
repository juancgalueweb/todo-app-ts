import type { FormInstance } from 'antd/es/form'
import { type Dayjs } from 'dayjs'
import { type TODO_FILTERS } from '../constants/const'

export interface ITodo {
  _id?: string
  title: string
  priority: string
  completed: boolean
  tags: string[]
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
    _id?: string
    title: string | undefined
    priority: string | undefined
    deadline: Dayjs | null
  }
  onFinish: (values: TodoSave) => void
  form: FormInstance
  name: string
  modalTitle: string
  confirmLoading: boolean | undefined
}

export enum TaskStatus {
  completed = 'Completado',
  pending = 'Pendiente'
}

export interface ITodosStore {
  todos: ITodo[]
  loading: boolean
  getTodos: () => void
  saveTodo: ({ title, priority, deadline }: TodoSave) => void
  removeTodo: ({ _id }: TodoId) => void
  updateCompletedStatus: ({ _id, completed }: TodoIdAndCompleted) => void
  updateTodo: ({ _id, title, priority, deadline }: TodoUpdateType) => void
  removeAllCompleted: () => void
}

export interface IFilterStore {
  filterSelected: string
  filterChange: (filter: FilterValue) => void
  activeCount: number
  completedCount: number
  filteredTodos: ITodo[]
  pageSize: number
  setPageSize: (pageSize: number) => void
  setFilteredTodos: () => void
  setActiveCount: () => void
  setCompletedCount: () => void
}
