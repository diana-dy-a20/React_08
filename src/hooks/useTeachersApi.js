import { useCallback, useState } from "react"
import apiRoutes from "../api/apiRoutes"
import axios from "axios"
const useTeachersApi = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [teacherId, setTeacherId] = useState(null)

  const fetchTeachers = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await axios.get(apiRoutes.getAllTeachers)
      setData(res.data)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [])
  const teacherGetId = useCallback(async (id) => {
    setLoading(true)
    setError(null)
    try {
      const res = await axios.get(apiRoutes.getTeacherById(id))
      setTeacherId(res.data)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [])
  const handleDelete = useCallback(
    async (id) => {
      setLoading(true)
      setError(null)
      try {
        await axios.delete(apiRoutes.deleteTeacher(id))
        fetchTeachers()
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    },
    [fetchTeachers]
  )
  return {
    data,
    loading,
    error,
    fetchTeachers,
    teacherId,
    teacherGetId,
    handleDelete,
  }
}

export default useTeachersApi
