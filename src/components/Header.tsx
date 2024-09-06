import styles from "./Header.module.css";
import logo from "../assets/Logo.svg";
import { SearchBar } from "./SearchBar";

export function Header() {
  return (
    <div className={styles.headerBar}>
      <header>
        <img src={logo} alt="Logotipo" />
      </header>
      <SearchBar />
    </div>
  );
}
