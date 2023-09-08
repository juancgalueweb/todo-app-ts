import { type Document } from 'mongoose'
import type { HttpStatusCode } from '../constants/http'

export interface ITodo extends Document {
  id: string
  userId: string
  title: string
  completed: boolean
  priority: string
  deadline: Date
}

export interface DeleteResult {
  deletedCount?: number
  acknowledged?: boolean
}

export type AddTodoBody = Pick<
  ITodo,
  'title' | 'completed' | 'priority' | 'deadline'
>

export interface IGetTodos {
  success: boolean
  statusCode: HttpStatusCode
  msg: string
  todos?: ITodo[]
}

export interface IAddTodo extends IGetTodos {
  todo?: ITodo
}

export interface IDeleteOrUpdateTodo {
  success: boolean
  statusCode: HttpStatusCode
  msg: string
  todo?: ITodo | null
}

export interface IDeleteTodos {
  success: boolean
  statusCode: HttpStatusCode
  msg: string
  deletedTodos?: DeleteResult
}
