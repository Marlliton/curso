import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { CyclesContext } from '../../../../context/CyclesContext'
import { CountDownInput, FromContainer, TaskInput } from './styles'

export function NewFormCycle() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

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
        min={5}
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
