import { useNavigate } from "react-router"
import frontRoutes from "../../routes/frontRoutes"
import useTeachersApi from "../../hooks/useTeachersApi"
import { useEffect, useState } from "react"
import TeacherCard from "./components/TeacherCard"
import styles from "./TeachersList.module.css";

function TeachersList() {
  const navigate = useNavigate()

  const { data: teachersList, loading, error, fetchTeachers } = useTeachersApi()
  const [selectedTeachersId, setSelectedTeachersId] = useState([])

  useEffect(() => {
    fetchTeachers()
  }, [fetchTeachers])
  function goToMeeting() {
    navigate(frontRoutes.navigate.meeting, {
      state: {
        teachers: teachersList.filter((teacher) =>
          selectedTeachersId.includes(teacher.id)
        ),
      },
    })
  }
	function addNewTeacher() {
		navigate(frontRoutes.navigate.teachers.add)
	}
  const onSelect = (id) => {
    if (selectedTeachersId.includes(id))
      setSelectedTeachersId((prev) => prev.filter((tId) => tId !== id))
    else setSelectedTeachersId((prev) => [...prev, id])
  }
  let content
  if (loading) content = <h2>Loading...</h2>
  else if (error) content = <h2>Error!</h2>
  else
    content = (
      <div className={styles.items}>
        {teachersList.map((teacher) => (
          <TeacherCard
            teacher={teacher}
            key={teacher.id}
            onSelect={onSelect}
            isSelected={selectedTeachersId.includes(teacher.id)}
          />
        ))}
      </div>
    )
  return (
    <>
      <h1 className={styles.tittle}>Список вчителів</h1>
      <div className={styles.buttons}>
        <button onClick={addNewTeacher}>Додати нового вчителя</button>
        <button
          onClick={goToMeeting}
        >{`Викликати ${selectedTeachersId.length} вчителів на збори`}</button>
      </div>
      {content}
    </>
  )
}

export default TeachersList
