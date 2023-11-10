import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	html {
		height: 100%;
	}

	body {
		min-height: 100vh;
	}

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
