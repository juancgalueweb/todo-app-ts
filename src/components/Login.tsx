import { type AxiosError } from 'axios'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { axiosWithoutToken } from '../api/axios'
import styles from '../styles/Login.module.css'

const OTP_KEY = 'todos-info-needed-to-verify-email'

const Login: React.FC = () => {
  const [inputEmail, setInputEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleOnchange = (event: React.ChangeEvent<HTMLInputElement>): void => {
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

  return (
    <div className={styles.container}>
      <h1>Inicio de sesión</h1>
      <p>
        No necesitará ingresar ninguna contraseña. A su correo electrónico le
        llegará un código de 4 dígitos que deberá ingresar para usar la
        aplicación.{' '}
        <strong>Si no lo recibe, no olvide revisar su bandeja de SPAM.</strong>
      </p>
      <form action='' onSubmit={handleSubmit} noValidate>
        <label htmlFor='email'>Ingrese su correo electrónico</label>
        <input
          type='email'
          id='email'
          placeholder='john_wick@gmail.com'
          onChange={handleOnchange}
          required
          ref={inputRef}
        />
        {errorMessage !== '' && (
          <div className={styles.error} role='alert'>
            <span>¡Error!</span> {errorMessage}
          </div>
        )}
        <button className='button-app' type='submit'>
          Obtener código
        </button>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Login
