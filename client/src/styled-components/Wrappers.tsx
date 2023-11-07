import styled from 'styled-components'

export const SContainer = styled.div`
  max-width: 56rem;
  max-height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem;

  h1 {
    text-align: center;
    line-height: 32px;
  }

  p {
    font-size: 1.125rem;
    line-height: 1.75rem;
    font-weight: 400;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  img {
    width: 50rem;
    height: auto;
    border-radius: 0.5rem;
    filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))
      drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;

    @media (max-width: 768px) {
      width: 100%;
    }
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
`

export const SPinFieldContainer = styled.div`
  display: block;
  text-align: center;
  margin: 1.25rem 0;
`
