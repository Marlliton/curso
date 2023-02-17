import styles from "./task.module.css";
import { Circle, CheckCircle, Trash } from "phosphor-react";
import { ListTask } from "../../core/task/ListTasks";
import { Task } from "../../core/task/Task";

interface TaskProps {
  listTask: ListTask;
  onChange(task: Task): void;
}

export function TaskComponent({ listTask, onChange }: TaskProps) {
  function renderTasks() {
    return listTask.all.map(task => {
      return (
        <div className={styles.container} key={task.id}>
          <button onClick={() => onChange(task.toggleStatus())} className={styles.button}>
            {task.completed ? (
              <CheckCircle size={24} className={styles.check} />
            ) : (
              <Circle size={24} className={styles.circle} />
            )}
          </button>
          <div>
            <span>{task.description}</span>
          </div>
          <button className={styles.button}>
            <Trash size={24} />
          </button>
        </div>
      );
    });
  }
  return <>{renderTasks()}</>;
}
