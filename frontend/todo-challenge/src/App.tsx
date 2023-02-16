import { Form } from "./components/form/Form";
import { Header } from "./components/header/Header";
import { Page } from "./components/template/Page";
import styles from './app.module.css'
import { EmptyTodo } from "./components/emptyTodo/ EmptyTodo";
import { Task } from "./components/task/Task";


function App() {
  return (
    <Page>
      <Header />
      <main className={styles.container}>
        <Form />
        <div className={styles.wrapper}>
          <header>
            <div>
              <p>Tarefas criadas <span>1</span></p>
              <p>Concluídas <span>2 de 15</span></p>
            </div>
          </header>
          <div className={styles.content}>
            {/* <EmptyTodo /> */}
            <Task />
            <Task />
            <Task />
            <Task />
            <Task />
            <Task />
            <Task />
            <Task />
            <Task />
            
          </div>
        </div>
      </main>
    </Page>
  )
}

export default App
