import { model, Schema } from 'mongoose'
import { type ITodo } from '../types/todo'

const todoSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'UserModel',
      required: [true, 'User ID is required']
    },
    title: {
      type: String,
      required: [true, 'Title is required']
    },
    completed: {
      type: Boolean,
      required: [true, 'Completed status is required']
    }
  },
  { timestamps: true }
)

export default model<ITodo>('TodoModel', todoSchema)
