import { useContext, useEffect } from 'react'
import { CyclesContext } from '../../../../context/CyclesContext'
import { CountDownContainer, Separator } from './styles'

function diffInSeconds(startDate: Date, endDate: Date) {
  const diffInMilliseconds = Math.abs(startDate.getTime() - endDate.getTime())
  const diffInSeconds = diffInMilliseconds / 1000

  return Math.floor(diffInSeconds)
}

export function CountDown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    updateSeconds,
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
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  )
}
