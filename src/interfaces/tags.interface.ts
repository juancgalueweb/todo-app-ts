export interface ITag {
  _id: string
  userId?: string
  tagName: string
  tagColor: `#${string}`
  createdAt?: Date
  updatedAt?: Date
  __v?: number
}
