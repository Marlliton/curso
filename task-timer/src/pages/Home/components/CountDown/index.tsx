import { CountDownContainer, Separator } from './styles'

function diffInSeconds(startDate: Date, endDate: Date) {
  const diffInMilliseconds = Math.abs(startDate.getTime() - endDate.getTime())
  const diffInSeconds = diffInMilliseconds / 1000

  return Math.floor(diffInSeconds)
}

export function CountDown() {
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        const differenceInSeconds = diffInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (differenceInSeconds > totalSeconds) {
          setCycles((state) =>
            state.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() }
              } else {
                return cycle
              }
            }),
          )

          clearInterval(interval)
        } else {
          setAmountSecondsPassed(differenceInSeconds)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, activeCycleId, totalSeconds])

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
