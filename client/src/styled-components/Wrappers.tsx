import { Button } from 'antd'
import styled from 'styled-components'
import { device } from '../helpers/devicesMediaqueries'

export const SContainer = styled.div`
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 0.5rem;
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
    flex-grow: 0.5;
    justify-content: center;
    align-items: center;

    @media ${device.laptop} {
      width: 60%;
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
`

export const SMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: between;
  height: 100vh;
  width: 100%;
  padding: 1rem;
`

export const SButtonHome = styled(Button)`
  margin-bottom: 1.5rem;
`
