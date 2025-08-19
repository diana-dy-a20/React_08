import { Outlet } from "react-router"
import GoHomeButton from "../components/GoHomeButton"
import styles from "./SimpleL.module.css";

function SimpleLayout() {
  return (
    <div className={styles.container}>
      <Outlet />
      <GoHomeButton />
    </div>
  )
}

export default SimpleLayout
