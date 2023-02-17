import { useEffect, useState } from "react";
import styles from "./app.module.css";
import { Form } from "./components/form/Form";
import { Header } from "./components/header/Header";
import { TaskComponent } from "./components/task/Task";
import { Page } from "./components/template/Page";
import { ListTask } from "./core/task/ListTasks";
import { Task } from "./core/task/Task";

const tasksMock = new ListTask({
  tasks: [
    new Task({ completed: false, description: "task 01" }),
    new Task({ completed: true, description: "task 02" }),
    new Task({ completed: true, description: "task 03" }),
    new Task({
      completed: false,
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos quis iusto quaerat. Similique, voluptates! Corrupti aspernatur tempora earum iure voluptate deserunt illum, possimus odio cumque culpa cupiditate, vel natus perferendis.",
    }),
  ],
  filter: null,
});

function App() {
  const [listTask, setListTasks] = useState(tasksMock);

  function onChange(task: Task) {
    const listModified = listTask.changedTask(task);
    console.log("🚀 ~ file: App.tsx:29 ~ onChange ~ listModified", listModified)
    setListTasks(listModified);
  }

  return (
    <Page>
      <Header />
      <main className={styles.container}>
        <Form />
        <div className={styles.wrapper}>
          <header>
            <div>
              <p>
                Tarefas criadas <span>1</span>
              </p>
              <p>
                Concluídas <span>2 de 15</span>
              </p>
            </div>
          </header>
          <div className={styles.content}>
            {/* <EmptyTodo /> */}
            <TaskComponent onChange={onChange} listTask={listTask} />
          </div>
        </div>
      </main>
    </Page>
  );
}

export default App;
