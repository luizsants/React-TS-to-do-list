/* eslint-disable @typescript-eslint/no-unused-vars */
import styles from "./Tasks.module.css";
import { ChangeEvent, useState } from "react";
import { UnitTask } from "./unitTask";

import { v4 as uuidv4 } from "uuid";

import ClipBoard from "../assets/Clipboard.svg";
import plus from "../assets/plus.svg";

export interface TaskType {
  id: string;
  content: string;
  isCompleted: boolean;
}

export function Tasks() {
  const [text, setText] = useState<string>("");
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const completedtasksNum = tasks.filter((task) => {
    return task.isCompleted != false;
  });
  const sortedTasks = tasks.sort((a, b) => {
    return a.isCompleted === b.isCompleted ? 0 : a.isCompleted ? 1 : -1;
  });

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter") {
      if (text.trim().length === 0) {
        (event.target as HTMLTextAreaElement).setCustomValidity(
          "Esse campo é obrigatório."
        );
        (event.target as HTMLTextAreaElement).reportValidity();

        event.preventDefault();
        console.log("nothing submited on click");
      } else {
        event.preventDefault();
        handleAddNewTask(text);
        setText("");
        console.log("new task submited on Enter");
      }
    }
  }

  function handleOnChage(event: ChangeEvent<HTMLTextAreaElement>) {
    if (event.target.value.length === 0) {
      (event.target as HTMLTextAreaElement).setCustomValidity(
        "Esse campo é obrigatório."
      );
      (event.target as HTMLTextAreaElement).reportValidity();
    } else {
      event.target.setCustomValidity("");
    }
    setText(event.target.value);
  }

  function handleSubmitOnClick(event: React.MouseEvent<HTMLButtonElement>) {
    const textArea = document.querySelector("textarea") as HTMLTextAreaElement;

    if (text.trim().length === 0) {
      event.preventDefault();
      textArea.setCustomValidity("Esse campo é obrigatório.");
      textArea.reportValidity();
      console.log("nothing submited on click");
    } else {
      event.preventDefault();
      handleAddNewTask(text);
      setText("");
      console.log("new task submited on click");
    }
  }

  function handleAddNewTask(newTask: string) {
    const taskObjectToAdd = {
      id: uuidv4(),
      content: newTask,
      isCompleted: false,
    };

    setTasks([...tasks, taskObjectToAdd]);
    console.log("new task added: ", taskObjectToAdd);
  }

  function handleIsCompleted(id: string) {
    let stsButton: boolean;
    const newTasksArray: TaskType[] = tasks.map((task) => {
      if (task.id === id) {
        // This conditional sentence below allows
        // the button goes checked and unchecked
        if (task.isCompleted) {
          stsButton = false;
        } else {
          stsButton = true;
        }
        return {
          id: task.id,
          content: task.content,
          isCompleted: stsButton,
        };
      } else {
        return task;
      }
    });

    setTasks(newTasksArray);
  }

  function handleDeleteTask(id: string) {
    const tasksPosDele = tasks.filter((task) => {
      return task.id != id;
    });
    setTasks(tasksPosDele);
  }

  return (
    <article>
      <div className={styles.baseSearchForm}>
        <form className={styles.searchForm}>
          <textarea
            name="taskName"
            onChange={handleOnChage}
            onKeyDown={handleKeyDown}
            value={text}
            placeholder="Adicione uma nova tarefa"
            required
          />
          <aside>
            <button type="submit" onClick={handleSubmitOnClick}>
              <p>Criar</p>
              <img src={plus} alt="plus signal" />
            </button>
          </aside>
        </form>
      </div>

      <section className={styles.headerTasks}>
        <div className={styles.numberCreatedTasks}>
          <h1 className={styles.createdTasks}>Tarefas criadas</h1>
          <div className={styles.tasksNum}>{tasks.length}</div>
        </div>

        <div className={styles.numberDoneTasksBox}>
          <h1 className={styles.doneTasksText}>Concluidas</h1>
          <div className={styles.doneTasksNum}>
            {completedtasksNum.length} de {tasks.length}
          </div>
        </div>
      </section>

      {tasks.length === 0 ? (
        <section className={styles.emptyTasksContent}>
          <img className={styles.clipImage} src={ClipBoard} alt="" />
          <h1>Voce ainda nao tem tarefas cadastradas</h1>
          <p>Crie tarefas e organize seus itens a fazer</p>
        </section>
      ) : (
        <UnitTask
          tasksToRender={sortedTasks}
          handleIsCompleted={handleIsCompleted}
          handleDeleteTask={handleDeleteTask}
        />
      )}
    </article>
  );
}
