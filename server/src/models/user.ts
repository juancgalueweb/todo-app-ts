import { model, Schema } from 'mongoose'
import { type IUser } from './../types/user'

const userSchema: Schema = new Schema(
  {
    userEmail: {
      type: String,
      required: [true, 'Se requiere el correo del usuario']
    }
  },
  { timestamps: true }
)

export default model<IUser>('UserModel', userSchema)
