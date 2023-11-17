import { device } from '../helpers/devicesMediaqueries'
import styled from 'styled-components'

export const SWelcomeParagraph = styled.p`
  font-size: 0.8rem;
  width: 60%;
  span {
    font-weight: 700;
  }

  @media ${device.laptop} {
    font-size: 1.2rem;
  }

  @media ${device.laptopL} {
    font-size: 1.3rem;
  }
`
