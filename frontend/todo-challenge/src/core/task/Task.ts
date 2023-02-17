import { Entity } from "../entity/Entity";

interface TaskProps {
  id?: string;
  description: string;
  completed: boolean;
}

export class Task extends Entity<Task, TaskProps> {
  constructor(props: TaskProps) {
    super(props);
  }

  get id() {
    return this._props.id;
  }
  get completed() {
    return this._props.completed;
  }
  get description() {
    return this._props.description;
  }

  public toggleStatus(): Task {
    const a = this.clone({ completed: !this.completed });
    console.log("🚀 ~ file: Task.ts:26 ~ Task ~ toggleStatus ~ a", a)
    return a;
  }
}
