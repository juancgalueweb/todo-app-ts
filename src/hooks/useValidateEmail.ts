import { type AxiosError, type AxiosResponse } from 'axios'
import { useId, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { axiosWithTokenValidateEmail } from '../api/axios'
import { APP_KEY, OTP_KEY } from '../constants/const'
import { type AxiosWithTokenValidateEmailOptions } from '../interfaces/axios.interface'
import {
  type errorDataType,
  type useValidateEmailReturn
} from '../interfaces/user.interface'

const useValidateEmail = (): useValidateEmailReturn => {
  const [code, setCode] = useState('')
  const [completed, setCompleted] = useState(false)
  const [attempts, setAttempts] = useState(3)
  const navigate = useNavigate()
  const toastSuccessId = useId()
  const toastErrorId = useId()

  const localStorageInfo = localStorage.getItem(OTP_KEY)
  const dataFromLocalStorage =
    typeof localStorageInfo === 'string' && JSON.parse(localStorageInfo)

  const dataToAxios: AxiosWithTokenValidateEmailOptions = {
    data: {
      userId: dataFromLocalStorage?.userId,
      otp: code,
      token: dataFromLocalStorage?.token
    }
  }

  const validateOPT = (): void => {
    axiosWithTokenValidateEmail('POST', 'auth/verifyEmail', dataToAxios)
      .then((response: AxiosResponse) => {
        const { userEmail, token, msg } = response.data
        const dataToLocalStorage = {
          token,
          userEmail
        }
        localStorage.setItem(APP_KEY, JSON.stringify(dataToLocalStorage))
        localStorage.removeItem(OTP_KEY)
        toast.success(msg, {
          onClose: () => {
            navigate('/todos')
          },
          position: 'top-center',
          autoClose: 4000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'light',
          toastId: toastSuccessId
        })
      })
      .catch((error: AxiosError) => {
        const errorData = error.response?.data as errorDataType
        const errorMessageFromBackend = errorData?.msg
        const invalidOTP = errorData?.invalidOTP
        if (invalidOTP && attempts > 1) {
          setAttempts(attempts - 1)
          toast.error(`Código inválido. Intentos restantes: ${attempts - 1}`, {
            position: 'top-center',
            autoClose: 4000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: 'light',
            toastId: toastErrorId
          })
        } else if (invalidOTP && attempts === 1) {
          toast.error(
            'Se te acabaron los intentos, pide un código nuevamente.',
            {
              onClose: () => {
                localStorage.removeItem(OTP_KEY)
                navigate('/login')
              },
              position: 'top-center',
              autoClose: 4000,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: 'light',
              toastId: toastErrorId
            }
          )
        } else {
          toast.error(errorMessageFromBackend, {
            onClose: () => {
              localStorage.removeItem(OTP_KEY)
              navigate('/login')
            },
            position: 'top-center',
            autoClose: 4000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: 'light',
            toastId: toastErrorId
          })
        }
      })
  }

  return { validateOPT, setCode, code, completed, setCompleted }
}

export default useValidateEmail
