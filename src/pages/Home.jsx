import { Link } from "react-router"
import frontRoutes from "../routes/frontRoutes"
import styles from "./Home.module.css";

function Home() {
  return (
    <>
      <h1 className={styles.tittle}>Ласкаво просимо до додатку "Вчителі"!</h1>
      <p>
        Цей додаток допоможе вам керувати інформацією про вчителів, викликати їх
        на збори та дізнаватись про розробника
      </p>
      <div className={styles.buttons}>
        <Link to={frontRoutes.navigate.teachers.index}>
          Переглянути вчителів
        </Link>
        <Link to={frontRoutes.navigate.meeting}>
          Переглянути список для зборів
        </Link>
      </div>
    </>
  )
}

export default Home
