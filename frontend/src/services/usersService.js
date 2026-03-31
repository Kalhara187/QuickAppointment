import apiClient from './apiClient'

export const usersService = {
  async getMyProfile() {
    const response = await apiClient.get('/users/me')
    return response.data
  },

  async updateMyProfile(data) {
    const response = await apiClient.put('/users/me', data)
    return response.data
  },

  async getUsers() {
    const response = await apiClient.get('/users')
    return response.data
  },

  async updateUserRole(id, role) {
    const response = await apiClient.put(`/users/${id}/role`, { role })
    return response.data
  },
}

export default usersService