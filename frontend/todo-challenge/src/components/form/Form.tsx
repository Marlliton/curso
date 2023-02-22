import { PlusCircle } from "phosphor-react";
import { FormEvent, useState } from "react";
import style from "./form.module.css";

interface FormProps {
  onSubmit(event: FormEvent<HTMLFormElement>): void;
}

export function Form({ onSubmit }: FormProps) {
  const [description, setDescription] = useState("");

  return (
    <div className={style.container}>
      <form
        onSubmit={event => {
          onSubmit(event);
          setDescription("");
        }}
      >
        <input
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Adicione uma nova tarefa"
          type="text"
          name="description"
        />
        <button type="submit">
          Criar <PlusCircle size={16} />
        </button>
      </form>
    </div>
  );
}
