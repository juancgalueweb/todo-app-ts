import { Button, Col, Row } from 'antd'
import { useNavigate } from 'react-router-dom'
import { APP_KEY } from '../constants/const'

const WelcomeAndLogout: React.FC = () => {
  const navigate = useNavigate()
  const localStorageInfo = localStorage.getItem(APP_KEY)
  const dataFromLocalStorage =
    typeof localStorageInfo === 'string' && JSON.parse(localStorageInfo)

  const handleOnClick = (): void => {
    localStorage.removeItem(APP_KEY)
    navigate('/')
  }

  return (
    <Row>
      <Col span={20} offset={2}>
        <div className='welcome'>
          <p>Bienvenid@, {dataFromLocalStorage?.userEmail}</p>
          <Button
            size='large'
            type='primary'
            onClick={() => {
              handleOnClick()
            }}
          >
            Logout
          </Button>
        </div>
      </Col>
    </Row>
  )
}

export default WelcomeAndLogout
