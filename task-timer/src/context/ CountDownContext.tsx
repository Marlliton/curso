import { createContext, ReactNode, useContext, useEffect } from 'react'
import { diffInSeconds } from '../utils/$Date'
import { CyclesContext } from './CyclesContext'

interface CountDownContextProps {
  children: ReactNode
}
interface CountDownContextData {
  minutes: string
  seconds: string
}

export const CountDownContext = createContext({} as CountDownContextData)

export function CountDownContextProvider({ children }: CountDownContextProps) {
  const {
    activeCycle,
    amountSecondsPassed,
    markCurrentCycleAsFinished,
    updateSeconds,
    activeCycleId,
  } = useContext(CyclesContext)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        const differenceInSeconds = diffInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (differenceInSeconds > totalSeconds) {
          markCurrentCycleAsFinished()
          clearInterval(interval)
        } else {
          updateSeconds(differenceInSeconds)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    activeCycleId,
    totalSeconds,
    markCurrentCycleAsFinished,
    updateSeconds,
  ])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}: Timer`
    }
  }, [activeCycle, minutes, seconds])

  return (
    <CountDownContext.Provider
      value={{
        minutes,
        seconds,
      }}
    >
      {children}
    </CountDownContext.Provider>
  )
}
