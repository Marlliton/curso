import { useContext } from 'react'
import { CyclesContext } from '../../context/CyclesContext'
import { getDistanceNow } from '../../utils/$Date'
import { HistoryContainer, HistoryList, Status } from './styles'

export function History() {
  const { cycles } = useContext(CyclesContext)

  function renderHistory() {
    return cycles.map((cycle) => {
      return (
        <tr key={cycle.id}>
          <td>{cycle.task}</td>
          <td>{cycle.minutesAmount} minutos</td>
          <td>{getDistanceNow(cycle.startDate)}</td>
          <td>
            {cycle.finishedDate && (
              <Status statusColor="green">Concluído</Status>
            )}
            {cycle.interruptedDate && (
              <Status statusColor="red">Interrompido</Status>
            )}
            {!cycle.finishedDate && !cycle.interruptedDate && (
              <Status statusColor="yellow">Em andamento</Status>
            )}
          </td>
        </tr>
      )
    })
  }
  return (
    <HistoryContainer>
      <h1>Meu Histórico</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{renderHistory()}</tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
