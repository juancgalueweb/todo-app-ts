import { type Document } from 'mongoose'

export interface ITodo extends Document {
  userEmail: string
  title: string
  id: string
  completed: boolean
}
