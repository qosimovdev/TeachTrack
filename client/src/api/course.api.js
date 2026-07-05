import api from "./axios"

export const createCourse = async (data) => {
    const res = await api.post("/courses", data)
    return res.data
}

export const getCourses = async () => {
    const res = await api.get("/courses")
    return res.data
}

export const getCourse = async (id) => {
    const res = await api.get(`/courses/${id}`)
    return res.data
}