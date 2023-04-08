import clipboard from "../../assets/Clipboard.svg"
import styles from "./emptyTodo.module.css"


export function EmptyTodo() {
  return (
    <div className={styles.container}>
      <img src={clipboard} alt="Clipboard tarefas vazias" />
      <p>Você ainda não tem tarefas cadastradas</p>
      <p>Crie novas tarefas e organize seus itens a fazer</p>
    </div>
  )
}