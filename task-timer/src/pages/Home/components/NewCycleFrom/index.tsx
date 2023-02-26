import { useForm } from 'react-hook-form'
import { CountDownInput, FromContainer, TaskInput } from './styles'

interface NewCycleFormData {
  task: string
  minutesAmount: number
}

export function NewFormCycle() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  return (
    <FromContainer>
      <label htmlFor="task">Vou trabalhar em</label>

      <TaskInput
        placeholder="Dê um nome para seu projeto"
        type="text"
        id="task"
        list="suggestions-list"
        {...register('task')}
        disabled={!!activeCycle}
      />
      <datalist id="suggestions-list">
        <option value="Task 01" />
        <option value="Task 02" />
        <option value="Task 03" />
        <option value="Any" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <CountDownInput
        step={5}
        max={60}
        min={1}
        placeholder="00"
        type="number"
        id="minutesAmount"
        {...register('minutesAmount', { valueAsNumber: true })}
        disabled={!!activeCycle}
      />
      <span>minutos.</span>
    </FromContainer>
  )
}
