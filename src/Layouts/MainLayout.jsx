import { Outlet } from "react-router"
import Header from "./components/Header"
import Footer from "./components/Footer"
import styles from "./MainL.module.css";

function MainLayout() {
  return (
    <>
      <Header />
      <main>
        <div className={styles.container}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default MainLayout
