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

export interface errorDataType {
  msg: string
  success: boolean
  invalidOTP: boolean
}
