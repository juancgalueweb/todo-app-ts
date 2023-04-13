import { type AxiosError } from 'axios'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { axiosWithoutToken } from '../api/axios'
import { type UseLoginReturn } from '../interfaces/user.interface'

const OTP_KEY = 'todos-info-to-verify-email'

const useLogin = (): UseLoginReturn => {
  const [inputEmail, setInputEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputEmail(event.target.value)
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

    // Check for invalid email format
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    if (!emailRegex.test(inputEmail)) {
      setErrorMessage('Por favor, ingrese un e-mail válido')
      inputRef.current?.focus()
      return
    }

    axiosWithoutToken('auth/createUser', { userEmail: inputEmail }, 'POST')
      .then(response => {
        const { id, token } = response.data
        const dataToLocalStorate = {
          userId: id,
          token
        }
        localStorage.setItem(OTP_KEY, JSON.stringify(dataToLocalStorate))
        toast.success('El código fue entregado. Revise su e-mail, por favor.', {
          onClose: () => {
            navigate('/validate-email')
          },
          position: 'top-center',
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'light'
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
            autoClose: 5000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: 'light'
          })
        }
      })
  }
  return { inputEmail, errorMessage, inputRef, handleOnChange, handleSubmit }
}

export default useLogin
