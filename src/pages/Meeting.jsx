import { useLocation, useNavigate } from "react-router"
import TeacherCard from "./teachers/components/TeacherCard"
import styles from "./Meeting.module.css"
import frontRoutes from "../routes/frontRoutes"

function Meeting() {
  const { state } = useLocation()
  const navigate = useNavigate()
  function goToTeachers() {
    navigate(frontRoutes.navigate.teachers.index)
  }
  let content
  if (state?.teachers)
    content = (
      <div className={styles.items}>
        <div
          className={styles.text}
        >{`Список вчителів (${state.teachers.length}) для виклику на збори:`}</div>
        {state.teachers.map((teacher) => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}
      </div>
    )
  else content = <h2>Додайте вчителів</h2>
  return (
    <>
      <h1 className={styles.tittle}>Учасники зборів</h1>
      {content}
      <button onClick={goToTeachers}>Повернутися до списку вчителів</button>
    </>
  )
}

export default Meeting
