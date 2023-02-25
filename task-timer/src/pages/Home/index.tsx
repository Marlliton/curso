import { Play } from 'phosphor-react'
import {
  CountDownContainer,
  CountDownInput,
  FromContainer,
  HomeContainer,
  Separator,
  StartCountDownButton,
  TaskInput,
} from './styles'

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FromContainer>
          <label htmlFor="task">Vou trabalhar em</label>

          <TaskInput
            placeholder="Dê um nome para seu projeto"
            type="text"
            id="task"
            list="suggestions-list"
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
          />
          <span>minutos.</span>
        </FromContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <StartCountDownButton disabled type="submit">
          <Play size={24} /> Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}
