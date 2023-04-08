import styled from 'styled-components'

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
