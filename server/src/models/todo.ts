import { model, Schema } from 'mongoose'
import { type ITodo } from '../types/todo'

const todoSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'UserModel',
      required: [true, 'Se requiere el ID del usuario']
    },
    title: {
      type: String,
      required: [true, 'Se requiere el título']
    },
    completed: {
      type: Boolean,
      required: [true, 'Se requiere el estado de la tarea']
    }
  },
  { timestamps: true }
)

export default model<ITodo>('TodoModel', todoSchema)
