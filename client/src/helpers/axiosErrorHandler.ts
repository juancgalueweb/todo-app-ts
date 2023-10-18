import { type AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { APP_KEY } from '../constants/const'

export const handleError = (error: AxiosError): void => {
  const errorData = error.response?.data
  if (
    typeof errorData === 'object' &&
    errorData !== null &&
    'expiredToken' in errorData &&
    'msg' in errorData
  ) {
    const errorMsgByExpiredToken = errorData.msg as string
    toast.error(errorMsgByExpiredToken, {
      onClose: () => {
        localStorage.removeItem(APP_KEY)
        window.location.replace('/')
      },
      position: 'top-center',
      autoClose: 4000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'light'
    })
  } else {
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
}
