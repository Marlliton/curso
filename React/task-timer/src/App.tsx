import { ThemeProvider } from 'styled-components'
import { Router } from './Routers'
import { defaultTheme } from './styles/default'
import { GlobalStyles } from './styles/global'
import { BrowserRouter } from 'react-router-dom'
import { CyclesContextProvider } from './context/CyclesContext'
import { CountDownContextProvider } from './context/ CountDownContext'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContextProvider>
          <CountDownContextProvider>
            <Router />
          </CountDownContextProvider>
        </CyclesContextProvider>
      </BrowserRouter>
      <GlobalStyles />
    </ThemeProvider>
  )
}
