import { PlusCircle } from "phosphor-react";
import style from "./form.module.css";

export function Form() {
  return (
    <div className={style.container}>
      <form >
        <input placeholder="Adicione uma nova tarefa" type="text" name="input-task" />
        <button type="submit">
          Criar <PlusCircle size={16} />
        </button>
      </form>
    </div>
  );
}
