import {
  CopyrightOutlined,
  GithubOutlined,
  LinkedinOutlined
} from '@ant-design/icons'
import { Col, Row } from 'antd'
import {
  SFooterContainer,
  SFooterSection,
  SFooterSocial,
  SHoverUnderlineAnimation
} from '../styled-components/SiteFooter'

function SiteFooter(): JSX.Element {
  const SOCIAL_ICON_SIZE = 30
  return (
    <Row justify='center'>
      <Col span={20}>
        <SFooterContainer>
          <SFooterSection>
            <p>
              Copyright <CopyrightOutlined /> 2023{' '}
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
              <GithubOutlined style={{ fontSize: SOCIAL_ICON_SIZE }} />
            </a>
            <a
              id='linkedinIcon'
              href='https://www.linkedin.com/in/juancgalue/'
              target='_blank'
              rel='noreferrer'
            >
              <LinkedinOutlined style={{ fontSize: SOCIAL_ICON_SIZE }} />
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
                Marco Perez Donoso
              </SHoverUnderlineAnimation>
            </p>
          </SFooterSection>
        </SFooterContainer>
      </Col>
    </Row>
  )
}
export default SiteFooter
