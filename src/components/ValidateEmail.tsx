import PinField from 'react-pin-field'
import { ToastContainer } from 'react-toastify'
import useValidateEmail from '../hooks/useValidateEmail'
import styles from '../styles/Login.module.css'
import styles2 from '../styles/ValidateEmail.module.css'

const ValidateEmail: React.FC = () => {
  const { validateOPT, setCode, completed, setCompleted } = useValidateEmail()

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
          onClick={() => {
            validateOPT()
          }}
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
