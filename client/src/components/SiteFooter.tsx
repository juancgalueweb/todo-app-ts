import {
  CopyrightOutlined,
  GithubOutlined,
  LinkedinOutlined
} from '@ant-design/icons'
import { SSiteFooter } from '../styled-components/SiteFooter'

function SiteFooter(): JSX.Element {
  const SOCIAL_ICON_SIZE = 30
  return (
    <SSiteFooter>
      <div className='flex_container'>
        <div className='footer_copyright'>
          <p>
            Copyright <CopyrightOutlined /> 2023{' '}
            <a
              href='https://www.linkedin.com/in/juancgalue/'
              target='_blank'
              rel='noreferrer'
            >
              Juan Carlos Galué
            </a>
          </p>
        </div>
        <div className='footer_social'>
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
        </div>
        <div className='footer_mention'>
          <p>
            Responsive design by{' '}
            <a
              href='https://www.linkedin.com/in/marcopdonoso/'
              target='_blank'
              rel='noreferrer'
            >
              Marco Perez Donoso
            </a>
          </p>
        </div>
      </div>
    </SSiteFooter>
  )
}
export default SiteFooter
