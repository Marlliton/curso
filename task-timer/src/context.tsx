import { createContext, useContext } from 'react'

interface ExempleContextType {
  countDownValue: number
  nameAvatar: string
}

const ExempleContext = createContext({} as ExempleContextType)

function Avatar() {
  const { nameAvatar } = useContext(ExempleContext)
  return <div>Nome do usuário: {nameAvatar}</div>
}

function CountDown() {
  const { countDownValue } = useContext(ExempleContext)
  return <div>Valor do contexto: {countDownValue}</div>
}

export function Home() {
  return (
    <ExempleContext.Provider
      value={{
        countDownValue: 5,
        nameAvatar: 'Marlliton',
      }}
    >
      <CountDown />
      <Avatar />
    </ExempleContext.Provider>
  )
}
