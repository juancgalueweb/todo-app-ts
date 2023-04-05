import { useAuth0 } from '@auth0/auth0-react'

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0()

  return (
    <button
      role='button'
      onClick={() => loginWithRedirect()}
      className='login-button'
    >
      Iniciar sesión
    </button>
  )
}

export default LoginButton
