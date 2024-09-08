// import style from "./App.module.css";
import { Header } from "./components/Header";
import style from './App.module.css'
import "./global.css";
import { Tasks } from "./components/Tasks";

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
