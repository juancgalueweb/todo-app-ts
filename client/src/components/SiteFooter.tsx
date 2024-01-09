import { Col, Row } from 'antd'
import {
  SFooterContainer,
  SFooterSection,
  SFooterSocial,
  SGithubOutlined,
  SHeartFilled,
  SHoverUnderlineAnimation,
  SLinkedinOutlined
} from '../styled-components/SiteFooter'

function SiteFooter(): JSX.Element {
  return (
    <Row justify='center'>
      <Col span={20}>
        <SFooterContainer>
          <SFooterSection>
            <p>
              <span>
                Hecho con <SHeartFilled /> por
              </span>
              <SHoverUnderlineAnimation
                href='https://github.com/juancgalueweb'
                target='_blank'
                rel='noreferrer'
              >
                Juan Carlos Galué
              </SHoverUnderlineAnimation>
            </p>
          </SFooterSection>
          <SFooterSocial>
            <a
              href='https://github.com/juancgalueweb/todo-app-ts'
              target='_blank'
              rel='noreferrer'
            >
              <SGithubOutlined />
            </a>
            <a
              href='https://www.linkedin.com/in/juancgalue/'
              target='_blank'
              rel='noreferrer'
            >
              <SLinkedinOutlined />
            </a>
          </SFooterSocial>
          <SFooterSection>
            <p>
              Diseño responsivo por
              <SHoverUnderlineAnimation
                href='https://github.com/marcopdonoso'
                target='_blank'
                rel='noreferrer'
              >
                Marco Pérez Donoso
              </SHoverUnderlineAnimation>
            </p>
          </SFooterSection>
        </SFooterContainer>
      </Col>
    </Row>
  )
}
export default SiteFooter
