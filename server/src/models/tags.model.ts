import { model, Schema } from 'mongoose'
import { MSGS_RESPONSES } from '../constants/msgs'
import { type ITag } from '../types/tags.types'

const tagSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'UserModel',
      required: [true, MSGS_RESPONSES.TODO_USER_ID_REQUIRED]
    },
    tagName: {
      type: String,
      required: [true, MSGS_RESPONSES.TAG_MODEL_NAME_REQUIRED],
      unique: true,
      minlength: [3, MSGS_RESPONSES.TAG_MODEL_NAME_TOO_SHORT],
      maxlength: [15, MSGS_RESPONSES.TAG_MODEL_NAME_TOO_LARGE],
      trim: true
    },
    tagColor: {
      type: String,
      required: [true, MSGS_RESPONSES.TAG_MODEL_COLOR_REQUIRED],
      unique: true,
      validate: {
        validator: (val: string) =>
          /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(val),
        message: MSGS_RESPONSES.TAG_MODEL_COLOR_INVALID
      },
      trim: true
    }
  },
  { timestamps: true }
)

export default model<ITag>('TagsModel', tagSchema)
