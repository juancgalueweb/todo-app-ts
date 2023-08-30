import { model, Schema } from 'mongoose'
import { MSGS_RESPONSES, Priorities } from '../constants/msgs'
import { type ITodo } from '../types/todo'

const todoSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'UserModel',
      required: [true, MSGS_RESPONSES.TODO_MODEL_USER_ID]
    },
    title: {
      type: String,
      required: [true, MSGS_RESPONSES.TODO_MODEL_TITLE]
    },
    completed: {
      type: Boolean,
      required: [true, MSGS_RESPONSES.TODO_MODEL_COMPLETED]
    },
    priority: {
      type: String,
      enum: [Priorities.high, Priorities.medium, Priorities.low],
      default: Priorities.low
    },
    deadline: {
      type: Date,
      required: [true, MSGS_RESPONSES.TODO_MODEL_DEADLINE]
    }
  },
  { timestamps: true }
)

export default model<ITodo>('TodoModel', todoSchema)
