import styled, { css } from 'styled-components'

export type ButtonVariants = 'primary' | 'secondary' | 'success' | 'danger'

interface ButtonContainerProps {
  variants: ButtonVariants
}

const buttonVariants = {
  primary: 'purple',
  secondary: 'yellow',
  success: 'green',
  danger: 'red',
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;
  border: 0;
  margin-left: 5px;
  border-radius: 8px;

  background-color: ${(props) => props.theme['green-300']};
  color: ${(props) => props.theme.white};
`
