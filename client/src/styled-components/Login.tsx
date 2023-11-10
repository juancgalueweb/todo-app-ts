import styled from 'styled-components'

export const SLoginForm = styled.form`
  width: 100vw;
  height: 18rem;
  background-color: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 500;
    color: rgb(17 24 39);
  }

  input {
    background-color: rgb(249 250 251);
    border-width: 1px;
    border-color: rgb(209 213 219);
    color: rgb(17 24 39);
    font-size: 1rem;
    line-height: 1.5rem;
    border-radius: 0.5rem;
    display: block;
    width: 50%;
    padding: 0.625rem;
    margin-bottom: 1.5rem;

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
      border-color: rgba(66, 153, 225, 0.5);
    }
  }
`

export const SError = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: #9b2c2c;
  border-radius: 0.5rem;
  background-color: #fed7d7;

  span {
    font-weight: 500;
  }
`
