import { type AxiosRequestConfig } from 'axios'

export interface AxiosWithoutTokenOptions extends AxiosRequestConfig {
  data?: { userEmail: string }
}

export interface AxiosWithTokenValidateEmailOptions extends AxiosRequestConfig {
  data?: {
    userId: string
    otp: string
    token: string
  }
}

export interface axiosWithTokenAndDataOptions extends AxiosRequestConfig {
  data?: {
    title: string
    completed: boolean
  }
}
