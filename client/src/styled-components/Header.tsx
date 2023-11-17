import styled from 'styled-components'
import { device } from '../helpers/devicesMediaqueries'

export const SHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 5rem;

  h1 {
    font-size: 4rem;
    font-weight: 200;
    color: #b83f45;
  }

  img {
    width: 60px;
    height: auto;
    display: inline-block;
  }

  @media ${device.tablet} {
    h1 {
      font-size: 5rem;
    }

    img {
      width: 80px;
    }
  }
`
