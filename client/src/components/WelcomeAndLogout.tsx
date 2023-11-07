import { Button, Col, Flex, Row } from 'antd'
import { useNavigate } from 'react-router-dom'
import { APP_KEY } from '../constants/const'
import { SWelcomeParagraph } from '../styled-components/WelcomeAndLogout'

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
        <Flex justify='space-between' align='center'>
          <SWelcomeParagraph>
            Bienvenid@, {dataFromLocalStorage?.userEmail}
          </SWelcomeParagraph>
          <Button
            size='large'
            type='primary'
            onClick={() => {
              handleOnClick()
            }}
          >
            Logout
          </Button>
        </Flex>
      </Col>
    </Row>
  )
}

export default WelcomeAndLogout
