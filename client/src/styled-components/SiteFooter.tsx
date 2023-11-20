import {
  GithubOutlined,
  HeartFilled,
  LinkedinOutlined
} from '@ant-design/icons'
import styled from 'styled-components'
import { device } from '../helpers/devicesMediaqueries'

const darkGray = '#232323'
const linkedInColor = '#0077b5'
const gray500 = '#71717A'
const gray800 = '#27272A'
const black = '#000'
const blue500 = '#3B82F6'
const SOCIAL_ICON_SIZE = '30px'
const HEART_ICON_SIZE = '15px'

export const SFooterContainer = styled.footer`
  width: 100%;
  margin: 2rem 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: ${darkGray};

  @media ${device.laptop} {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`

export const SFooterSection = styled.div`
  font-size: 0.8rem;
  color: ${gray500};

  p {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    @media ${device.laptop} {
      width: 100%;
      display: flex;
      flex-direction: row;
      gap: 4px;
      justify-content: space-between;
      align-items: center;
    }
  }
`

export const SFooterSocial = styled.div`
  display: flex;
  gap: 4rem;
  margin: 0.5rem 0;
  a {
    color: ${gray800};
  }
  #githubIcon:hover {
    color: ${black};
  }
  #linkedinIcon:hover {
    color: ${linkedInColor};
  }
`

export const SHoverUnderlineAnimation = styled.a`
  position: relative;
  color: ${gray800};
  font-size: 0.9rem;
  font-weight: bold;
  text-decoration: none;

  &:after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: -2px;
    left: 0;
    background-color: ${blue500};
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }

  &:visited {
    color: ${gray800};
  }
`

export const SGithubOutlined = styled(GithubOutlined)`
  font-size: ${SOCIAL_ICON_SIZE};
`

export const SLinkedinOutlined = styled(LinkedinOutlined)`
  font-size: ${SOCIAL_ICON_SIZE};
`

export const SHeartFilled = styled(HeartFilled)`
  font-size: ${HEART_ICON_SIZE};
  color: #f43f5e;
`
