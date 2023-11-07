import { Button } from 'antd'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import useLogin from '../hooks/useLogin'
import { SError, SLoginForm } from '../styled-components/Login'
import { SContainer } from '../styled-components/Wrappers'

const Login: React.FC = () => {
  const { errorMessage, inputRef, handleOnChange, handleSubmit } = useLogin()

  return (
    <SContainer>
      <h1>Inicio de sesión</h1>
      <p>
        No necesitas registrarte. A tu correo electrónico te llegará un código
        de 4 dígitos que deberás ingresar para usar la aplicación.{' '}
        <strong>
          Si no lo recibes, no olvides revisar tu bandeja de SPAM 😎.
        </strong>
      </p>
      <SLoginForm action='' onSubmit={handleSubmit} noValidate>
        <label htmlFor='email'>Ingresa un correo electrónico válido</label>
        <input
          type='email'
          id='email'
          placeholder='john_wick@gmail.com'
          onChange={handleOnChange}
          required
          ref={inputRef}
          name='email'
        />
        {errorMessage !== '' && (
          <SError role='alert'>
            <span>¡Error!</span> {errorMessage}
          </SError>
        )}
        <Button htmlType='submit' type='primary' size='large'>
          Obtener código
        </Button>
      </SLoginForm>
      <ToastContainer />
    </SContainer>
  )
}

export default Login
