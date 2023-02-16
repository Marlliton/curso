import styles from "./task.module.css";
import { Circle, CheckCircle, Trash } from "phosphor-react";

export function Task() {
  return (
    <div className={styles.container}>
      <div>
        <Circle size={24} className={styles.circle} />
      </div>
      <div>
        <span>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt quia dicta inventore
          incidunt laboriosam sunt tenetur recusandae necessitatibus aut.
        </span>
      </div>
      <button className={styles.button}>
        <Trash size={24} />
      </button>
    </div>
  );
}
