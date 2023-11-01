import { type AxiosRequestConfig } from 'axios'
import { type Dayjs } from 'dayjs'

export interface AxiosWithoutTokenOptions extends AxiosRequestConfig {
  data?: { userEmail: string }
}

export interface AxiosWithTokenValidateEmailOptions extends AxiosRequestConfig {
  data?: {
    otp: string
  }
}

export interface axiosWithTokenUpdateTodoOptions extends AxiosRequestConfig {
  data?: {
    title?: string
    deadline?: Date | Dayjs
    priority?: string
    completed?: boolean
  }
}

export interface AxiosWithTokenTagOptions extends AxiosRequestConfig {
  data?: {
    tagName?: string
    tagColor?: `#${string}`
  }
}
