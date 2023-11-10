import { device } from '../helpers/devicesMediaqueries'
import styled from 'styled-components'

export const SContainer = styled.div`
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 1rem;
  text-align: justify;

  h1 {
    text-align: center;
    line-height: 32px;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.125rem;
    line-height: 1.75rem;
    font-weight: 400;
    margin: 1rem 0;
  }

  figure {
    display: flex;
    flex-direction: column;
    margin: 0;
    flex-grow: 0.7;
    justify-content: center;
    align-items: center;

    @media ${device.laptop} {
      width: 70%;
    }
  }

  img {
    height: auto;
    border-radius: 0.5rem;
    filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))
      drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    width: 100%;
  }

  footer {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  figcaption {
    text-align: center;
    color: red;
    font-size: 1rem;
    font-weight: 500;
  }

  @media ${device.tablet} {
    padding: 1.5rem 2rem;
  }
`

export const SPinFieldContainer = styled.div`
  display: block;
  text-align: center;
  margin: 1.25rem 0;
`
