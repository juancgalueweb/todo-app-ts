import { type Document } from 'mongoose'

export interface ITodo extends Document {
  userId: string
  title: string
  id: string
  completed: boolean
}
