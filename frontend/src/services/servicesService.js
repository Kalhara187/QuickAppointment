import apiClient from './apiClient'

export const servicesService = {
  async getServices(params = {}) {
    const response = await apiClient.get('/services', { params })
    return response.data
  },

  async createService(data) {
    const response = await apiClient.post('/services', data)
    return response.data
  },

  async updateService(id, data) {
    const response = await apiClient.put(`/services/${id}`, data)
    return response.data
  },

  async deleteService(id) {
    const response = await apiClient.delete(`/services/${id}`)
    return response.data
  },
}

export default servicesService