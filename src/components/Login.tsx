import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import useLogin from '../hooks/useLogin'
import styles from '../styles/Login.module.css'

const Login: React.FC = () => {
  const { errorMessage, inputRef, handleOnChange, handleSubmit } = useLogin()

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
          onChange={handleOnChange}
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
