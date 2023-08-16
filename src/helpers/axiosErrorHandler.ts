import { type AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const handleError = (error: AxiosError): void => {
  const errorData = error.response?.data
  if (
    typeof errorData === 'object' &&
    errorData !== null &&
    'msg' in errorData
  ) {
    const errorMessageFromAxios = errorData.msg as string
    toast.error(errorMessageFromAxios, {
      position: 'top-center',
      autoClose: 4000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'light'
    })
  }
}
