import styled from 'styled-components'

export const HistoryContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  padding: 3.5rem;

  h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme['gray-100']};
  }
`

export const HistoryList = styled.div`
  flex: 1;
  overflow: auto;

  table {
    width: 100%;
    min-width: 600px;
    border-collapse: collapse;

    th {
      background-color: ${(props) => props.theme['gray-600']};
      padding: 1rem;
      text-align: left;

      line-height: 1.6;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background-color: ${(props) => props.theme['gray-700']};
      padding: 1rem;

      border-top: 4px solid ${(props) => props.theme['gray-800']};
      line-height: 1.5;
      font-size: 0.875rem;

      white-space: nowrap;

      &:first-child {
        width: 50%;
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`

const STATUS_COLOR_OPTIONS = {
  yellow: 'yellow-500',
  green: 'green-500',
  red: 'red-500',
} as const

interface StatusProps {
  statusColor: keyof typeof STATUS_COLOR_OPTIONS
}

export const Status = styled.span<StatusProps>`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  &::before {
    content: '';
    height: 0.5rem;
    width: 0.5rem;

    border-radius: 50%;
    background-color: ${(props) =>
      props.theme[STATUS_COLOR_OPTIONS[props.statusColor]]};
  }
`
