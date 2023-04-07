import { type Document } from 'mongoose'

export interface IUser extends Document {
  userEmail: string
}
