import styled from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

const BaseInput = styled.input`
  background-color: transparent;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme['gray-600']};
  font-weight: bold;
  line-height: 1.25rem;
  height: 2.25rem;
  color: ${(props) => props.theme['gray-100']};

  &::placeholder {
    color: ${(props) => props.theme['gray-500']};
  }

  &:focus {
    box-shadow: none;
    border-bottom: 2px solid ${(props) => props.theme['green-500']};
  }
`

export const TaskInput = styled(BaseInput)`
  flex: 1;
  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

export const CountDownInput = styled(BaseInput)`
  width: 4rem;
`

export const FromContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
  font-weight: bold;
  flex-wrap: wrap;
  color: ${(props) => props.theme['gray-100']};
`

export const CountDownContainer = styled.div`
  display: flex;
  gap: 1rem;

  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;

  span {
    background-color: ${(props) => props.theme['gray-700']};
    padding: 2rem 1rem;
    border-radius: 8px;
  }
`
export const Separator = styled.div`
  padding: 2rem 0;
  width: 4rem;
  color: ${(props) => props.theme['green-500']};

  display: flex;
  justify-content: center;
  overflow: hidden;
`
export const StartCountDownButton = styled.button`
  width: 100%;
  background-color: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme['gray-100']};

  border-radius: 8px;
  border: 0;
  padding: 1rem 0;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  transition: all 0.1s;
  cursor: pointer;

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme['green-700']};
  }

  &:disabled {
    cursor: not-allowed;
    filter: brightness(0.7);
  }
`
