import type { AxiosError, AxiosResponse } from 'axios'
import { create } from 'zustand'
import { axiosWithToken } from '../api/axios'
import { handleError } from '../helpers/axiosErrorHandler'
import type { ITag } from '../interfaces/tags.interface'

interface ITagsStore {
  tags: ITag[]
  getTags: () => void
  loading: boolean
}

export const useTagsStore = create<ITagsStore>((set) => ({
  tags: [],
  loading: false,
  getTags: () => {
    set({ loading: true })
    axiosWithToken('GET', 'tags/user')
      .then((response: AxiosResponse) => {
        const { tags } = response.data
        set({ tags })
      })
      .catch((error: AxiosError) => {
        handleError(error)
      })
      .finally(() => {
        set({ loading: false })
      })
  }
}))
