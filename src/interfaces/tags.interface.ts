export interface ITag {
  _id: string
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
