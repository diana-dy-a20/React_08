import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import apiRoutes from "../../api/apiRoutes"
import useTeachersApi from "../../hooks/useTeachersApi"
import styles from "./TeachersForm.module.css"

function TeachersForm() {
  const [teacher, setTeacher] = useState({
    name: "",
    subject: "",
    photo: "",
  })
  const {
    data: { loading: apiLoading },
    error,
    teacherId,
    teacherGetId,
  } = useTeachersApi()

  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id

  useEffect(() => {
    if (isEditing && teacherId) {
      setTeacher({
        name: teacherId.name || "",
        subject: teacherId.subject || "",
        photo: teacherId.photo || "",
      })
    }
  }, [isEditing, teacherId])
  useEffect(() => {
    if (id) teacherGetId(id)
  }, [id, teacherGetId])
  const handleChange = (e) => {
    setTeacher((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const method = isEditing ? "PUT" : "POST"
    const url = isEditing ? apiRoutes.updateTeacher(id) : apiRoutes.addTeacher
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(teacher),
    })
    navigate("/teachers")
  }
  const isLoading = isEditing && apiLoading && !teacherId

  return isLoading ? (
    <div>Завантаження...</div>
  ) : (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.tittle}>
        {isEditing ? "Редагувати дані вчителя" : "Додати нового вчителя"}
      </h2>
      <label>
        Ім'я:
        <input
          type="text"
          name="name"
          value={teacher.name}
          onChange={handleChange}
          placeholder="Введіть ім'я вчителя"
        />
      </label>
      <label>
        Предмет:
        <input
          type="text"
          name="subject"
          value={teacher.subject}
          onChange={handleChange}
          placeholder="Введіть предмет"
        />
      </label>
      <label>
        Фото URL (не обов'язково):
        <input
          type="text"
          name="photo"
          value={teacher.photo}
          onChange={handleChange}
          placeholder="Додайте посилання на фото"
        />
      </label>

      <button type="submit">Зберегти</button>
    </form>
  )
}

export default TeachersForm
