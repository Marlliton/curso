import { Form } from "./components/form/Form";
import { Header } from "./components/header/Header";
import { Page } from "./components/template/Page";
import styles from './app.module.css'
import { EmptyTodo } from "./components/emptyTodo/ EmptyTodo";


function App() {
  return (
    <Page>
      <Header />
      <main className={styles.container}>
        <Form />
        <div className={styles.wrapper}>
          <header>
            <div>
              <p>Tarefas criadas <span>0</span></p>
              <p>Concluídas <span>0</span></p>
            </div>
          </header>
          <div className={styles.content}>
            <EmptyTodo />
          </div>
        </div>
      </main>
    </Page>
  )
}

export default App
