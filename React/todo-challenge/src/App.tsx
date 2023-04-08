import { FormEvent, useEffect, useState } from "react";
import styles from "./app.module.css";
import { EmptyTodo } from "./components/emptyTodo/ EmptyTodo";
import { Form } from "./components/form/Form";
import { Header } from "./components/header/Header";
import { TaskComponent } from "./components/task/Task";
import { Page } from "./components/template/Page";
import { ListTask } from "./core/task/ListTasks";
import { Task } from "./core/task/Task";

function App() {
  const [listTask, setListTasks] = useState(new ListTask({ tasks: [], filter: null }));
  const [totalCompleted, setTotalCompleted] = useState(0);

  useEffect(() => {
    setTotalCompleted(listTask.totalCompleted());
  }, [listTask]);

  function onChange(task: Task) {
    const listModified = listTask.changedTask(task);
    setListTasks(listModified);
  }

  function deleteTask(task: Task) {
    const newList = listTask.deleteTask(task);
    setListTasks(newList);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const description = new FormData(event.currentTarget).get("description");
    if (!description) return;
    const task = Task.newTask(description as string);
    const newList = listTask.addTask(task);
    setListTasks(newList);
  }

  return (
    <Page>
      <Header />
      <main className={styles.container}>
        <Form onSubmit={handleSubmit} />
        <div className={styles.wrapper}>
          <header>
            <div>
              <p>
                Tarefas criadas <span>{listTask.all.length}</span>
              </p>
              <p>
                Concluídas{" "}
                <span>
                  {totalCompleted} de {listTask.all.length}
                </span>
              </p>
            </div>
          </header>
          <div className={styles.content}>
            {listTask.all.length ? (
              <TaskComponent onChange={onChange} onDelete={deleteTask} listTask={listTask} />
            ) : (
              <EmptyTodo />
            )}
          </div>
        </div>
      </main>
    </Page>
  );
}

export default App;
