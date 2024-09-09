import style from './App.module.css'
import { Header } from "./components/Header";
import { Tasks } from "./components/Tasks";

import "./global.css";

function App() {
  return (
    <div >
      <Header />
      <div className={style.wrapper}>
        <main>
          <Tasks />
        </main>
      </div>
    </div>
  );
}

export default App;
