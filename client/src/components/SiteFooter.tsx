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
              Made with <SHeartFilled /> by{' '}
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
              id='githubIcon'
              href='https://github.com/juancgalueweb/todo-app-ts'
              target='_blank'
              rel='noreferrer'
            >
              <SGithubOutlined />
            </a>
            <a
              id='linkedinIcon'
              href='https://www.linkedin.com/in/juancgalue/'
              target='_blank'
              rel='noreferrer'
            >
              <SLinkedinOutlined />
            </a>
          </SFooterSocial>
          <SFooterSection>
            <p>
              Responsive design by{' '}
              <SHoverUnderlineAnimation
                href='https://www.linkedin.com/in/marcopdonoso/'
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
