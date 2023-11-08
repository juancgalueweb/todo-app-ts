import type { AxiosError, AxiosResponse } from 'axios'
import { create } from 'zustand'
import { axiosWithToken, axiosWithTokenAndTagData } from '../api/axios'
import { handleError } from '../helpers/axiosErrorHandler'
import type { ITagsStore } from '../interfaces/tags.interface'
import { useTodosStore } from './todosStore'

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
  },
  saveTag: ({ tagName, tagColor }) => {
    set({ loadingTag: true })
    if (tagName.length === 0) return
    const dataToAxios = {
      data: {
        tagName,
        tagColor
      }
    }
    axiosWithTokenAndTagData('POST', 'tag', dataToAxios)
      .then((response: AxiosResponse) => {
        const { success } = response.data
        if (success) {
          const currentTags = get().tags
          const { tag } = response?.data
          set({ tags: [...currentTags, tag] })
        }
      })
      .catch((error: AxiosError) => {
        handleError(error)
      })
      .finally(() => {
        set({ loadingTag: false })
      })
  },
  editTag: ({ _id, tagName, tagColor }) => {
    set({ loadingTag: true })
    if (tagName.length === 0) return
    if (_id !== null) {
      const dataToAxios = {
        data: {
          tagName,
          tagColor
        }
      }
      axiosWithTokenAndTagData('PUT', `tag/${_id}`, dataToAxios)
        .then((response: AxiosResponse) => {
          const { success, tag } = response.data
          if (success) {
            useTodosStore.getState().getTodos()
            const currentTags = get().tags
            const tagsAfterUpdate = currentTags.map((currentTag) => {
              if (currentTag._id === _id) {
                return { ...tag }
              }
              return currentTag
            })
            set({ tags: tagsAfterUpdate })
          }
        })
        .catch((error: AxiosError) => {
          handleError(error)
        })
        .finally(() => {
          set({ loadingTag: false })
        })
    }
  }
}))
