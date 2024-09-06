import styles from "./Search.module.css";
import  plus  from "../assets/plus.svg";

export function SearchBar() {
  return (
    <div className={styles.container}>
      <form className={styles.searchForm}>
        <textarea placeholder="Adicione uma nova tarefa" />
        <aside>
          <button type="submit">
            <p>Criar</p>
            <img src={plus} alt='plus signal' />
          </button>
        </aside>
      </form>
    </div>
  );
}
