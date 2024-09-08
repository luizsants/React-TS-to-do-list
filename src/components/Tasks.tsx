/* eslint-disable @typescript-eslint/no-unused-vars */
import styles from "./Tasks.module.css";
import { ChangeEvent, useState } from "react";
import { Trash } from "phosphor-react";
import { v4 as uuidv4 } from "uuid";

import ClipBoard from "../assets/Clipboard.svg";
import plus from "../assets/plus.svg";
import vector from "../assets/Vector.svg";

interface TaskType {
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

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }

  function handleOnChage(event: ChangeEvent<HTMLTextAreaElement>) {
    setText(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLButtonElement>) {
    if (text === "") {
      console.log(text);
    } else {
      event.preventDefault();
      handleAddNewTask(text);
      setText("");
    }
  }
  function handleSubmitOnClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    handleAddNewTask(text);
    setText("");
  }

  function handleNewTextInvalid(
    event: React.InvalidEvent<HTMLTextAreaElement>
  ) {
    event.target.setCustomValidity("Esse campo é obrigratório");
  }

  function handleAddNewTask(newTask: string) {
    setTasks([
      ...tasks,
      {
        id: uuidv4(),
        content: newTask,
        isCompleted: false,
      },
    ]);
  }

  function handleIsCompleted(id: string) {
    const newTasksArray: TaskType[] = tasks.map((task) => {
      if (task.id === id) {
        let aux: boolean;
        if (task.isCompleted) {
          aux = false;
        } else {
          aux = true;
        }
        return {
          id: task.id,
          content: task.content,
          isCompleted: aux,
        };
      } else {
        return task;
      }
    });

    setTasks(newTasksArray);
  }

  function handleDeleteTask(id: string) {
    const tasksPosDele = tasks.filter((task) => {
      return task.id != id ? task : console.log(task);
    });

    setTasks(tasksPosDele);
  }

  return (
    <article>
      <div className={styles.container}>
        <form className={styles.searchForm}>
          <textarea
            name="taskName"
            onChange={handleOnChage}
            onKeyDown={handleKeyDown}
            value={text}
            placeholder="Adicione uma nova tarefa"
            onInvalid={handleNewTextInvalid}
            required
          />
          <aside>
            <button
              type="submit"
              onSubmit={handleSubmit}
              onClick={handleSubmitOnClick}
            >
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
        <section className={styles.tasksContent}>
          <img className={styles.clipImage} src={ClipBoard} alt="" />
          <h1>Voce ainda nao tem tarefas cadastradas</h1>
          <p>Crie tarefas e organize seus itens a fazer</p>
        </section>
      ) : (
        <section className={styles.tasksUnitsBox}>
          {tasks.map((task) => (
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

              <div className={styles.contentTask}>{task.content}</div>
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
      )}
    </article>
  );
}
