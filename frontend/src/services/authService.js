import apiClient from './apiClient'

export const authService = {
  async login(data) {
    const response = await apiClient.post('/auth/login', data)
    return response.data
  },

  async register(data) {
    const response = await apiClient.post('/auth/register', data)
    return response.data
  },
}

export default authService