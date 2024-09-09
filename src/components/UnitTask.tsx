import { Trash } from "phosphor-react";
import styles from "./UnitTask.module.css";
import type { TaskType } from "./Tasks";

import vector from "../assets/Vector.svg";

interface UnitTaskType {
  tasksToRender: TaskType[];
  handleIsCompleted: (id: string) => void;
  handleDeleteTask: (id: string) => void;
}

export function UnitTask({
  tasksToRender,
  handleIsCompleted,
  handleDeleteTask,
}: UnitTaskType) {
  return (
    <section className={styles.tasksUnitsBox}>
      {tasksToRender.map((task) => (
        <div className={styles.taskLine} key={task.id}>
          {!task.isCompleted ? (
            <div className={styles.buttonBox}>
              <button
                onClick={() => handleIsCompleted(task.id)}
                className={styles.button}
                type="submit"
              />
            </div>
          ) : (
            <div className={styles.buttonBox}>
              <button
                onClick={() => handleIsCompleted(task.id)}
                className={styles.buttonMarked}
                type="submit"
              >
                <img src={vector} alt="sinal de ✔" />
              </button>
            </div>
          )}

          <div
            className={
              task.isCompleted ? styles.doneContentTask : styles.contentTask
            }
          >
            {task.content}
          </div>
          <div className={styles.deleteTaskBox}>
            <div
              onClick={() => handleDeleteTask(task.id)}
              className={styles.trashIcon}
            >
              <Trash size={20} />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
