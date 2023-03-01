import { HandPalm, Play } from 'phosphor-react'
import { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { CyclesContext } from '../../context/CyclesContext'
import { CountDown } from './components/CountDown'
import { NewFormCycle } from './components/NewCycleFrom'
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles'

interface NewCycleFormData {
  task: string
  minutesAmount: number
}

export function Home() {
  const { createANewCycle, interruptCycle, activeCycle } =
    useContext(CyclesContext)
  const newCycleForm = useForm<NewCycleFormData>({
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch } = newCycleForm

  const task = watch('task')
  const isDisabledSubmit = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(createANewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewFormCycle />
        </FormProvider>
        <CountDown />

        {activeCycle ? (
          <StopCountDownButton onClick={interruptCycle} type="button">
            <HandPalm size={24} /> Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton disabled={isDisabledSubmit} type="submit">
            <Play size={24} /> Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}
