import { Clonable } from "../shared/Clonable";
import { Task } from "./Task";

interface ListTaskProps {
  tasks: Task[];
  filter: "completed" | "Pending" | null;
}

export class ListTask extends Clonable<ListTask, ListTaskProps> {
  constructor(props: ListTaskProps) {
    super(props);
  }

  get all() {
    return this._applyFilter(this._props.tasks);
  }

  deleteTask(taskToDelete: Task) {
    const newList = this.props.tasks.filter(task => task.id !== taskToDelete.id);
    this._props.tasks = newList;
    return this.clone({ tasks: newList });
  }

  changedTask(modifiedTask: Task): ListTask {
    const newList = this._props.tasks.map(task =>
      task.id === modifiedTask.id ? modifiedTask : task
    );
    return this.clone({ tasks: newList });
  }

  addTask(task: Task): ListTask {
    const newList = [...this._props.tasks, task];
    return this.clone({ tasks: newList });
  }

  totalCompleted() {
    const total = this.clone({ filter: "completed" }).all.length;
    return total;
  }

  private _completedOnly(tasks: Task[]): Task[] {
    return tasks.filter(task => task.completed);
  }

  private _pendingOnly(tasks: Task[]): Task[] {
    return tasks.filter(task => !task.completed);
  }

  private _applyFilter(tasks: Task[]) {
    if (this.props.filter === "completed") {
      return this._completedOnly(tasks);
    } else if (this.props.filter === "Pending") {
      return this._pendingOnly(tasks);
    }

    return tasks;
  }
}
