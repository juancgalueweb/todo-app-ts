import { type Document } from 'mongoose'

export interface IUser extends Document {
  name: string
}
