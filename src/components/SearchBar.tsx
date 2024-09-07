import React, { ChangeEvent, useState } from 'react';

import styles from "./Search.module.css";
import plus from "../assets/plus.svg";

export function SearchBar() {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [text, setText] = useState<string>('');

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if(event.key === 'Enter'){
      event.preventDefault();
    }
  }

  function handleOnChage(event: ChangeEvent<HTMLTextAreaElement>) {
    setText(event.target.value);
  }

  function handleSubmit () {
    
  }

  return (
    <div className={styles.container}>
      <form className={styles.searchForm}>
        <textarea
          onChange={handleOnChage}
          onKeyDown={handleKeyDown}
          placeholder="Adicione uma nova tarefa"
        />
        <aside>
          <button 
            type="submit"
            onClick={handleSubmit}
          >
            <p>Criar</p>
            <img src={plus} alt="plus signal" />
          </button>
        </aside>
      </form>
    </div>
  );
}
