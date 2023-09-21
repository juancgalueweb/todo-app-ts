import { type Document } from 'mongoose'

export interface ITags extends Document {
  userId: string
  tagName: string
  tagColor: string
}
