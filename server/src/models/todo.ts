import { model, Schema } from 'mongoose'
import { type ITodo } from '../types/todo'

const todoSchema: Schema = new Schema(
  {
    userEmail: {
      type: Schema.Types.ObjectId,
      ref: 'UserModel',
      required: [true, 'User ID is required']
    },
    title: {
      type: String,
      required: true
    },

    id: {
      type: String,
      required: true
    },

    completed: {
      type: Boolean,
      required: true
    }
  },
  { timestamps: true }
)

export default model<ITodo>('TodoModel', todoSchema)
