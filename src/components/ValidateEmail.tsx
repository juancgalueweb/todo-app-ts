import { useState } from 'react'
import PinField from 'react-pin-field'
import { axiosWithToken } from '../api/axios'
import styles from '../styles/Login.module.css'
import styles2 from '../styles/VerifyEmail.module.css'

const OTP_KEY = 'todos-info-to-verify-email'

const ValidateEmail: React.FC = () => {
  const [code, setCode] = useState('')
  const [, setCompleted] = useState(false)

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
        console.log('Respuesta de axios', response)
      })
      .catch(error => {
        console.error('Error en axios', error)
      })
  }

  return (
    <>
      <div className={styles.container}>
        <h1>Ingrese el código recibido</h1>
        <p>
          Por favor, ingrese el código que recibió para poder usar la app 😎
        </p>
        <div style={{ display: 'block', textAlign: 'center' }}>
          <PinField
            className={styles2.pinField}
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
        <button onClick={validateOPT}>Validar e-mail</button>
      </div>
    </>
  )
}

export default ValidateEmail
