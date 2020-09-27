import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider, CSSReset, theme } from '@chakra-ui/core'
import App from './App'
import { AuthProvider } from './context'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CSSReset />
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById(`root`),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
