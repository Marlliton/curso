import 'styled-components'
import { defaultTheme } from '../styles/default'

type MyApplicationTheme = typeof defaultTheme

declare module 'styled-components' {
  export interface DefaultTheme extends MyApplicationTheme {}
}
