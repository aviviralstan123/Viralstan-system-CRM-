import axios from 'axios'

const resolveBaseURL = () => {
  const configured = import.meta.env.VITE_API_URL?.trim()

  if (configured) {
    return configured.replace(/\/$/, '')
  }

  // Default for both local (Vite proxy) and production (reverse proxy).
  return '/api'
}

const api = axios.create({
  baseURL: resolveBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
})

const unwrapData = (response) => {
  const payload = response?.data

  if (payload && typeof payload === 'object' && 'data' in payload) {
    return payload.data
  }

  return payload
}

const extractList = (payload) => {
  if (Array.isArray(payload)) return payload
  if (payload && Array.isArray(payload.data)) return payload.data
  if (payload && payload.data && Array.isArray(payload.data.data)) return payload.data.data
  return []
}

export const getBlogs = async () => {
  const response = await api.get('/blogs')
  return extractList(unwrapData(response))
}

export const getSingleBlog = async (id) => {
  const response = await api.get(`/blogs/id/${id}`)
  return unwrapData(response)
}

export const getServices = async () => {
  const response = await api.get('/services')
  return extractList(unwrapData(response))
}

export const getIndustries = async () => {
  const response = await api.get('/industries')
  return extractList(unwrapData(response))
}

export const getReviews = async () => {
  const response = await api.get('/reviews')
  return extractList(unwrapData(response))
}

export const getPublicSettings = async () => {
  const response = await api.get('/settings/public')
  return unwrapData(response) || {}
}

export default api
