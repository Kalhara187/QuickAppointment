import apiClient from './apiClient'

export const appointmentService = {
  async getAdminAppointments() {
    const response = await apiClient.get('/appointments')
    return response.data
  },

  async getMyAppointments() {
    const response = await apiClient.get('/appointments/user')
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

  async cancelAppointment(id) {
    const response = await apiClient.delete(`/appointments/${id}`)
    return response.data
  },
}

export default appointmentService