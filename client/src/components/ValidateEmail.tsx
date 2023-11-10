import { ToastContainer } from 'react-toastify'
import useValidateEmail from '../hooks/useValidateEmail'
import { SButton, SLink, SPinField } from '../styled-components/ValidateEmail'
import { SContainer, SPinFieldContainer } from '../styled-components/Wrappers'

const ValidateEmail: React.FC = () => {
  const { validateOTP, setCode, completed, setCompleted } = useValidateEmail()

  return (
    <>
      <SContainer>
        <h1>Ingrese el código recibido</h1>
        <p>
          Por favor, ingrese el código que recibió en su correo electrónico para
          poder usar la app 😎.
        </p>
        <p>
          Recuerde que el código expira a los 60 minutos luego de ser recibido,
          si ya pasó ese tiempo, puede solicitar otro sin problema en el{' '}
          <SLink to='/login'>login</SLink>.
        </p>
        <SPinFieldContainer>
          <SPinField
            $completed={completed}
            length={4}
            onComplete={() => {
              setCompleted(true)
            }}
            onChange={(val) => {
              setCode(val)
              setCompleted(false)
            }}
            autoFocus
            validate='0123456789'
          />
        </SPinFieldContainer>
        <SButton
          type='primary'
          size='large'
          onClick={() => {
            validateOTP()
          }}
          disabled={!completed}
        >
          Validar e-mail
        </SButton>
      </SContainer>
      <ToastContainer />
    </>
  )
}

export default ValidateEmail
