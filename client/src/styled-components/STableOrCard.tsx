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

    @media ${device.laptop} {
      display: none;
    }
  }
`
