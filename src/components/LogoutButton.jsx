import { useAuth0 } from '@auth0/auth0-react'

const LogoutButton = () => {
  const { logout } = useAuth0()
  return (
    <button
      role='button'
      className='login-button'
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Cerrar sesión
    </button>
  )
}

export default LogoutButton
