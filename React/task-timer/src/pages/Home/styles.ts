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

const BaseCountDownButton = styled.button`
  width: 100%;

  border-radius: 8px;
  border: 0;
  padding: 1rem 0;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  color: ${(props) => props.theme['gray-100']};
  transition: all 0.1s;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    filter: brightness(0.7);
  }
`

export const StartCountDownButton = styled(BaseCountDownButton)`
  background-color: ${(props) => props.theme['green-500']};
  &:not(:disabled):hover {
    background-color: ${(props) => props.theme['green-700']};
  }
`

export const StopCountDownButton = styled(BaseCountDownButton)`
  background-color: ${(props) => props.theme['red-500']};
  &:not(:disabled):hover {
    background-color: ${(props) => props.theme['red-700']};
  }
`
