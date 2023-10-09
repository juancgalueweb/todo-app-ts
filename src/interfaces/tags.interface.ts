import type { FormInstance } from 'antd/es/form'

export interface ITag {
  _id?: string
  userId?: string
  tagName: string
  tagColor: `#${string}`
  createdAt?: Date
  updatedAt?: Date
  __v?: number
}

export interface TagModalProps {
  openTagModal: boolean
  onCancelTag: () => void
  modalTitleTag: string
}

export type TagId = Pick<ITag, '_id'>
export type TagSave = Pick<ITag, 'tagName' | 'tagColor'>
export type TagEdit = Pick<ITag, '_id' | 'tagName' | 'tagColor'>

export interface ITagsStore {
  tags: ITag[]
  getTags: () => void
  removeTag: ({ _id }: TagId) => void
  loadingTag: boolean
  saveTag: ({ tagName, tagColor }: TagSave) => void
  editTag: ({ _id, tagName, tagColor }: TagEdit) => void
}

export interface ApiDataTags {
  success: boolean
  msg: string
  tag: ITag
}

export interface CreateEditTagModalProps {
  open: boolean
  onCancel: () => void
  onOk: () => void
  initialValues: {
    _id?: string
    tagName: string | undefined
    tagColor: string | undefined
  }
  onFinish: (values: TagSave | TagEdit) => void
  form: FormInstance
  name: string
  modalTitle: string
  confirmLoading: boolean | undefined
}
