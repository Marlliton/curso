import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'
import {
  createANewCycleAction,
  interruptCycleAction,
  markAsCurrentCycleAsFinishedAction,
} from '../reducers/cycles/actions'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'
import { diffInSeconds } from '../utils/$Date'

interface CreateCycleData {
  task: string
  minutesAmount: number
}
interface CyclesContextData {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished(): void
  updateSeconds(seconds: number): void
  createANewCycle(data: CreateCycleData): void
  markCurrentCycleAsFinished(): void
  interruptCycle(): void
  updateSeconds(seconds: number): void
}
export const CyclesContext = createContext({} as CyclesContextData)

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const stateStringify = localStorage.getItem('@task-timer:version_1.0.0')
      if (stateStringify) {
        return JSON.parse(stateStringify)
      }
      return initialState
    },
  )

  const { activeCycleId, cycles } = cyclesState
  const activeCycle = cycles.find(
    (cycle) => cycle.id === cyclesState.activeCycleId,
  )
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle)
      return diffInSeconds(new Date(), new Date(activeCycle.startDate))

    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)
    localStorage.setItem('@task-timer:version_1.0.0', stateJSON)
  }, [cyclesState])

  function createANewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(createANewCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }

  function markCurrentCycleAsFinished() {
    dispatch(markAsCurrentCycleAsFinishedAction())
  }

  function interruptCycle() {
    dispatch(interruptCycleAction())
  }

  function updateSeconds(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        createANewCycle,
        interruptCycle,
        markCurrentCycleAsFinished,
        updateSeconds,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
