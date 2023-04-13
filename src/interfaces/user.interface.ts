export interface UseLoginReturn {
  inputEmail: string
  errorMessage: string
  inputRef: React.RefObject<HTMLInputElement>
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}
