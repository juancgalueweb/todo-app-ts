import { type AxiosRequestConfig } from 'axios'

export interface UseLoginReturn {
  inputEmail: string
  errorMessage: string
  inputRef: React.RefObject<HTMLInputElement>
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export interface useValidateEmailReturn {
  validateOPT: () => void
  code: string
  completed: boolean
  setCode: (code: string) => void
  setCompleted: (completed: boolean) => void
}

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

export interface axiosWithTokenSaveTodoOptions extends AxiosRequestConfig {
  data?: {
    title: string
    completed: boolean
  }
}
