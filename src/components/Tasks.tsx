/* eslint-disable @typescript-eslint/no-unused-vars */
import styles from "./Tasks.module.css";
import ClipBoard from "../assets/Clipboard.svg";
import { TaskUnit } from "./TaskUnit";
import { useState } from "react";


interface TaskType {
    id: number;
    content: string;
    isCompleted: boolean;
}

export function Tasks() {
  const [tasks, setTasks] = useState<TaskType[]>([{
    id: 1,
    content: "olá",
    isCompleted: false,
    
  }]);

  return (
    <article>
      <section className={styles.headerTasks}>
        <h1 className={styles.createdTasks}>Tarefas criadas</h1>
        <h1 className={styles.doneTasks}>Concluidas</h1>
      </section>

      {tasks.length === 0 ? (
        <section className={styles.tasksContent}>
          <img className={styles.clipImage} src={ClipBoard} alt="" />
          <h1>Voce ainda nao tem tarefas cadastradas</h1>
          <p>Crie tarefas e organize seus itens a fazer</p>
        </section>
      ):(
        <ul>
            {tasks.map(task => (
                <li>{task.content}</li>
            ))}
        </ul>
      )
      }
    </article>
  );
}
