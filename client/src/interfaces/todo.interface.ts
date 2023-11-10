import type { FormInstance } from 'antd/es/form'
import { type Dayjs } from 'dayjs'
import { type TODO_FILTERS } from '../constants/const'
import type { ITag } from './tags.interface'

export interface ITodo {
  _id?: string
  title: string
  priority: string
  completed: boolean
  tags: ITag[]
  deadline: Date | Dayjs
  createdAt?: Date
  updatedAt?: Date
  __v?: number
}

export type TodoId = Pick<ITodo, '_id'>
export type TodoSave = Pick<ITodo, 'title' | 'priority' | 'deadline' | 'tags'>
export type TodoIdAndCompleted = Pick<ITodo, '_id' | 'completed'>
export type TodoUpdateType = Pick<
  ITodo,
  '_id' | 'title' | 'priority' | 'deadline' | 'tags'
>

export interface ITodoUpdate {
  _id: string | undefined
  title: string
  priority: string
  deadline: Date | Dayjs
  tags: string[]
}

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
  initialValues?: {
    _id?: string
    title: string | undefined
    priority: string | undefined
    deadline: Dayjs | null
    tags: string[] | undefined
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
  updateTodo: ({ _id, title, priority, deadline, tags }: ITodoUpdate) => void
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

export interface UseCreateTodoReturn {
  showModal: () => void
  handleCancel: () => void
  showTagModal: () => void
  handleCancelTag: () => void
  confirmLoading: boolean
  open: boolean
  openTag: boolean
  form: FormInstance
  getTags: () => void
  saveTodo: (todo: TodoSave) => void
  handleSubmit: (values: TodoSave) => void
  initialData: {
    title: string
    priority: SpaPriority
    deadline: null
    tags: never[]
  }
}

export interface UseFooterInfoReturn {
  showPopconfirm: () => void
  handleCancel: () => void
  open: boolean
  confirmLoading: boolean
  activeCount: number
  completedCount: number
  removeAllCompleted: () => void
  setConfirmLoading: (value: boolean) => void
}

export interface UseTodosTableReturn {
  handleCancel: () => void
  showModal: (record: ITodo) => void
  handleSubmit: () => void
  completeTodoMsg: (completed: boolean) => void
  deleteMsg: () => void
  getTags: () => void
  open: boolean
  confirmLoading: boolean
  contextHolder: JSX.Element
  filteredTodos: ITodo[]
  removeTodo: ({ _id }: TodoId) => void
  updateCompletedStatus: ({ _id, completed }: TodoIdAndCompleted) => void
  loading: boolean
  form: FormInstance
  pageSize: number
  setPageSize: (pageSize: number) => void
}
