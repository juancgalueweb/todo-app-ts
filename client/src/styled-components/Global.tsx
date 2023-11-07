import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
  font-family: -apple-system, system-ui, 'Segoe UI', Roboto, 'Helvetica Neue',
    Ubuntu, sans-serif;
}

  .completed-table-cell {
    color: #949494;
    text-decoration: line-through;
    background-color: #e5e5e5;
  }
`
