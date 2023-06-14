import { type Document } from 'mongoose'

export interface ITodo extends Document {
  userId: string
  title: string
  id: string
  completed: boolean
}

export interface DeleteResult {
  deletedCount?: number
  acknowledged?: boolean
}

export type AddTodoBody = Pick<ITodo, 'title' | 'completed'>
