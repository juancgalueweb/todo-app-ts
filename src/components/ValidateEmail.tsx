import { type AxiosError } from 'axios'
import { useId, useState } from 'react'
import PinField from 'react-pin-field'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { axiosWithToken } from '../api/axios'
import styles from '../styles/Login.module.css'
import styles2 from '../styles/VerifyEmail.module.css'

const OTP_KEY = 'todos-info-to-verify-email'
const APP_KEY = 'todos-info-to-use-app'

const ValidateEmail: React.FC = () => {
  const [code, setCode] = useState('')
  const [completed, setCompleted] = useState(false)
  const navigate = useNavigate()
  const toastSuccessId = useId()
  const toastErrorId = useId()

  const dataFromLocalStorage = JSON.parse(
    localStorage.getItem(OTP_KEY) as string
  )

  const dataToAxios = {
    userId: dataFromLocalStorage?.userId,
    otp: code,
    token: dataFromLocalStorage?.token
  }

  const validateOPT = (): void => {
    axiosWithToken('POST', 'auth/verifyEmail', dataToAxios)
      .then(response => {
        const { userId, userEmail, token, msg } = response.data
        const dataToLocalStorage = {
          userId,
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

  return (
    <>
      <div className={styles.container}>
        <h1>Ingrese el código recibido</h1>
        <p>
          Por favor, ingrese el código que recibió en su correo electrónico para
          poder usar la app 😎.
        </p>
        <p>
          Recuerde que el código expira a los 10 minutos luego de ser recibido,
          si ya pasó ese tiempo, puede solicitar otro sin problema.
        </p>
        <div className='pin-field-wrapper'>
          <PinField
            className={`${styles2.pinField} ${
              completed ? `${styles2.completed}` : ''
            }`}
            length={4}
            onComplete={() => {
              setCompleted(true)
            }}
            onChange={val => {
              setCode(val)
              setCompleted(false)
            }}
            autoFocus
            validate='0123456789'
          />
        </div>
        <button
          style={{ margin: '0 auto', marginTop: '1.5rem' }}
          className='button-app'
          onClick={validateOPT}
          disabled={!completed}
        >
          Validar e-mail
        </button>
      </div>
      <ToastContainer />
    </>
  )
}

export default ValidateEmail
