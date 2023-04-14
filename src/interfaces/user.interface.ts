import { type AxiosRequestConfig } from 'axios'

export interface UseLoginReturn {
  inputEmail: string
  errorMessage: string
  inputRef: React.RefObject<HTMLInputElement>
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export interface AxiosWithoutTokenOptions extends AxiosRequestConfig {
  data?: { userEmail: string }
}
