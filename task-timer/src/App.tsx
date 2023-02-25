import { ThemeProvider } from 'styled-components'
import { Router } from './Routers'
import { defaultTheme } from './styles/default'
import { GlobalStyles } from './styles/global'
import { BrowserRouter } from 'react-router-dom'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <GlobalStyles />
    </ThemeProvider>
  )
}
