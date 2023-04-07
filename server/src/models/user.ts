import { model, Schema } from 'mongoose'
import { type IUser } from './../types/user'

const userSchema: Schema = new Schema(
  {
    userEmail: {
      type: String,
      required: [true, 'The user is required']
    }
  },
  { timestamps: true }
)

export default model<IUser>('UserModel', userSchema)
