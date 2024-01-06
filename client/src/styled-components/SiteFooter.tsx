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
`

export const SHoverUnderlineAnimation = styled.a`
  position: relative;
  color: ${gray800};
  font-size: 0.9rem;
  font-weight: bold;
  text-decoration: none;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 500ms;

  &:before {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    width: 0px;
    height: 2px;
    border-radius: 9999px;
    opacity: 0;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 500ms;
    background: linear-gradient(
      90deg,
      hsla(333, 100%, 53%, 1) 0%,
      hsla(33, 94%, 57%, 1) 100%
    );
  }

  &:hover::before {
    width: 100%;
    opacity: 1;
  }

  &:visited,
  &:hover {
    color: ${gray800};
  }
`

export const SGithubOutlined = styled(GithubOutlined)`
  font-size: ${SOCIAL_ICON_SIZE};
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;

  &:hover {
    transform: scale(1.25);
    color: ${black};
  }
`

export const SLinkedinOutlined = styled(LinkedinOutlined)`
  font-size: ${SOCIAL_ICON_SIZE};
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;

  &:hover {
    transform: scale(1.25);
    color: ${linkedInColor};
  }
`

export const SHeartFilled = styled(HeartFilled)`
  font-size: ${HEART_ICON_SIZE};
  color: #f43f5e;
`
