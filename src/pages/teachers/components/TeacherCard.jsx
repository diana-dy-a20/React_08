import { Link, useNavigate } from "react-router"
import styles from "./TeacherCard.module.css"
import frontRoutes from "../../../routes/frontRoutes"
import useTeachersApi from "../../../hooks/useTeachersApi"
import apiRoutes from "../../../api/apiRoutes"
function TeacherCard({ teacher, onSelect, isSelected }) {
  const { handleDelete } = useTeachersApi()
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.section1}>
          <img src={teacher.photo} alt="photo" />
          <div className={styles.name}>
            <div>{teacher.name}</div>
            <div>{teacher.subject}</div>
          </div>
        </div>
        <div className={styles.section2}>
          {onSelect ? (
            <button onClick={() => onSelect(teacher.id)}>
              {isSelected ? "Вибрано" : "Вибрати на збори"}
            </button>
          ) : null}
        </div>
      </div>

      <>
        {onSelect ? (
          <div className={styles.buttons}>
            <Link to={frontRoutes.navigate.teachers.edit(teacher.id)}>
              Редагувати
            </Link>
            <button onClick={() => handleDelete(teacher.id)}>Видалити</button>
          </div>
        ) : null}
      </>
    </div>
  )
}

export default TeacherCard
