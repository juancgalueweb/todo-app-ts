import styled from 'styled-components'
import { device } from '../helpers/devicesMediaqueries'

export const STableOrCard = styled.div`
  .todos-table {
    display: none;
    @media ${device.laptop} {
      display: block;
    }
  }

  .todos-cards {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 100%;

    @media ${device.laptop} {
      display: none;
    }
  }

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

  .task-details {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`
