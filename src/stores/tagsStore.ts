import type { AxiosError, AxiosResponse } from 'axios'
import { create } from 'zustand'
import { axiosWithToken } from '../api/axios'
import { handleError } from '../helpers/axiosErrorHandler'
import type { ITag, TagId } from '../interfaces/tags.interface'
import { useTodosStore } from './todosStore'

interface ITagsStore {
  tags: ITag[]
  getTags: () => void
  removeTag: ({ _id }: TagId) => void
  loadingTag: boolean
}

export const useTagsStore = create<ITagsStore>((set, get) => ({
  tags: [],
  loadingTag: false,
  getTags: () => {
    set({ loadingTag: true })
    axiosWithToken('GET', 'tags/user')
      .then((response: AxiosResponse) => {
        const { tags } = response.data
        set({ tags })
      })
      .catch((error: AxiosError) => {
        handleError(error)
      })
      .finally(() => {
        set({ loadingTag: false })
      })
  },
  removeTag: ({ _id }) => {
    set({ loadingTag: true })
    axiosWithToken('DELETE', `tag/${_id}`)
      .then((response: AxiosResponse) => {
        const { success } = response.data
        if (success) {
          const currentTags = get().tags
          const tagsAfterDeleteOne = currentTags.filter(
            (tag) => tag._id !== _id
          )
          set({ tags: tagsAfterDeleteOne })
          // Llamar a la función getTodos de useTodosStore para actualizar los todos
          const todosStore = useTodosStore.getState()
          todosStore.getTodos()
        }
      })
      .catch((error: AxiosError) => {
        handleError(error)
      })
      .finally(() => {
        set({ loadingTag: false })
      })
  }
}))
