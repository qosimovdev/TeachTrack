import api from "./axios"

export const createGroup = async (data) => {
    const res = await api.post("/groups", data)
    return res.data
}

export const getGroups = async () => {
    const res = await api.get("/groups")
    return res.data
}

export const getGroup = async (id) => {
    const res = await api.get(`/groups/${id}`)
    return res.data
}