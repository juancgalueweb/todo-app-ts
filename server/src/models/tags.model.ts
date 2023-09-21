import { model, Schema } from 'mongoose'
import { MSGS_RESPONSES } from '../constants/msgs'
import { type ITags } from '../types/tags'

const tagSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'UserModel',
      required: [true, MSGS_RESPONSES.TODO_USER_ID_REQUIRED]
    },
    tagName: {
      type: String,
      required: [true, MSGS_RESPONSES.TAGS_MODEL_NAME_REQUIRED],
      unique: true
    },
    tagColor: {
      type: String,
      required: [true, MSGS_RESPONSES.TAGS_MODEL_COLOR_REQUIRED],
      unique: true
    }
  },
  { timestamps: true }
)

export default model<ITags>('TagsModel', tagSchema)
