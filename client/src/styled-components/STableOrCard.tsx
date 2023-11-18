import styled from 'styled-components'
import { device } from '../helpers/devicesMediaqueries'

export const STableOrCard = styled.div`
  .task-card {
    width: 100%;

    @media ${device.tablet} {
      width: 60%;
    }
  }

  .task-card-completed {
    width: 100%;
    background-color: #e5e5e5;
    color: #989898;
    text-decoration: line-through;

    @media ${device.tablet} {
      width: 60%;
    }
  }
`

export const STodosTableContainer = styled.div`
  display: none;
  @media ${device.laptop} {
    display: block;
  }
`

export const STodosCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;

  @media ${device.laptop} {
    display: none;
  }
`

export const STaskDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`
