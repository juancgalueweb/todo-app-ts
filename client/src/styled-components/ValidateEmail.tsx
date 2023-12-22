import { Button } from 'antd'
import PinField from 'react-pin-field'
import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { device } from '../helpers/devicesMediaqueries'

export const SLink = styled(Link)`
  outline: none;

  &:link {
    color: #6900ff;
  }

  &:visited {
    color: #6900ff;
  }

  &:focus {
    text-decoration: none;
    background: #bae498;
  }

  &:hover {
    text-decoration: none;
    background: #cdfeaa;
  }

  &:active {
    background: #6900ff;
    color: #cdfeaa;
  }
`

const shake = keyframes`
  from {
    transform: scale(1.05) translateY(-5%);
  }

  to {
    transform: scale(1.05) translateY(5%);
  }
`

export const SPinField = styled(PinField)<{ $completed?: boolean }>`
  background-color: rgb(248, 249, 250);
  border: 1px solid rgb(204, 204, 204);
  border-radius: 0.3rem;
  border-color: ${(props) => (props.$completed ? 'rgb(40, 167, 69)' : '')};
  background-color: ${(props) =>
    props.$completed ? 'rgba(40, 167, 69, 0.1)' : ''};
  font-size: 3rem;
  margin: 0.25rem;
  outline: none;
  text-align: center;
  transition-duration: 250ms;
  transition-property: background, color, border, box-shadow, transform;
  height: 4.5rem;
  width: 4rem;

  @media ${device.tablet} {
    height: 3.5rem;
    width: 3rem;
  }

  &:focus {
    border-color: rgb(0, 123, 255);
    outline: none;
    transform: scale(1.05);
  }

  &:invalid {
    animation: ${shake} 3 linear 75ms;
    border-color: rgb(220, 53, 69);
    box-shadow: 0 0 0.25rem rgba(220, 53, 69, 0.5);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`

export const SButton = styled(Button)`
  margin: 0 auto;
  margin-top: 1.5rem;
`
