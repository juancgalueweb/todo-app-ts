import { model, Schema } from 'mongoose'
import { MSGS_RESPONSES } from '../constants/msgs'
import { type IUser } from './../types/user'

const userSchema: Schema = new Schema(
  {
    userEmail: {
      type: String,
      required: [true, MSGS_RESPONSES.USER_MODEL_USEREMAIL]
    }
  },
  { timestamps: true }
)

export default model<IUser>('UserModel', userSchema)
