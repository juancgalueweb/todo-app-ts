import styled from 'styled-components'
import { device } from '../helpers/devicesMediaqueries'

const darkGray = '#232323'
const linkedInColor = '#0077b5'
const gray500 = '#71717A'
const gray800 = '#27272A'
const black = '#000'

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

  a {
    color: ${gray800};
    font-size: 0.9rem;
    font-weight: bold;
    text-decoration: none;

    &:visited {
      color: ${gray800};
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
