import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export const appointmentService = {
  async getAppointments() {
    const response = await apiClient.get('/appointments')
    return response.data
  },

  async getAppointment(id) {
    const response = await apiClient.get(`/appointments/${id}`)
    return response.data
  },

  async createAppointment(data) {
    const response = await apiClient.post('/appointments', data)
    return response.data
  },

  async updateAppointment(id, data) {
    const response = await apiClient.put(`/appointments/${id}`, data)
    return response.data
  },

  async deleteAppointment(id) {
    const response = await apiClient.delete(`/appointments/${id}`)
    return response.data
  },
}

export default apiClient