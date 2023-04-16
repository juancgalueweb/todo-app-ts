import { type AxiosError } from 'axios'
import { useId, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { axiosWithoutToken } from '../api/axios'
import {
  type AxiosWithoutTokenOptions,
  type UseLoginReturn
} from '../interfaces/user.interface'

const OTP_KEY = 'todos-info-to-verify-email'

const useLogin = (): UseLoginReturn => {
  const [inputEmail, setInputEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const toastSuccessId = useId()
  const toastErrorId = useId()

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const trimmedEmail = event.target.value.trim()
    setInputEmail(trimmedEmail)
    setErrorMessage('')
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    // Check for empty email
    if (inputEmail.length === 0) {
      setErrorMessage('Por favor, ingrese su e-mail')
      inputRef.current?.focus()
      return
    }

    // Check for email length
    if (inputEmail.length > 200) {
      setErrorMessage('Su e-mail no puede tener más de 200 caracteres')
      inputRef.current?.focus()
      return
    }

    // Check for invalid email format
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    if (!emailRegex.test(inputEmail)) {
      setErrorMessage('Por favor, ingrese un e-mail válido')
      inputRef.current?.focus()
      return
    }

    const data: AxiosWithoutTokenOptions = {
      data: { userEmail: inputEmail }
    }
    axiosWithoutToken('POST', 'auth/createUser', data)
      .then(response => {
        const { userId, token, msg } = response.data
        const dataToLocalStorage = {
          userId,
          token
        }
        localStorage.setItem(OTP_KEY, JSON.stringify(dataToLocalStorage))
        toast.success(msg, {
          onClose: () => {
            navigate('/validate-email')
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
            theme: 'light',
            toastId: toastErrorId
          })
        }
      })
  }
  return { inputEmail, errorMessage, inputRef, handleOnChange, handleSubmit }
}

export default useLogin
