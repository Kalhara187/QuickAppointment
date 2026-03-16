import axios from 'axios'
import type { Appointment, APIResponse } from '@types/index'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor to add auth token if needed
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const appointmentService = {
  // Get all appointments
  getAppointments: async (): Promise<APIResponse<Appointment[]>> => {
    try {
      const response = await apiClient.get('/appointments')
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Get single appointment
  getAppointment: async (id: string): Promise<APIResponse<Appointment>> => {
    try {
      const response = await apiClient.get(`/appointments/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Create appointment
  createAppointment: async (data: Partial<Appointment>): Promise<APIResponse<Appointment>> => {
    try {
      const response = await apiClient.post('/appointments', data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Update appointment
  updateAppointment: async (id: string, data: Partial<Appointment>): Promise<APIResponse<Appointment>> => {
    try {
      const response = await apiClient.put(`/appointments/${id}`, data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Delete appointment
  deleteAppointment: async (id: string): Promise<APIResponse<void>> => {
    try {
      const response = await apiClient.delete(`/appointments/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  },
}

export default apiClient
