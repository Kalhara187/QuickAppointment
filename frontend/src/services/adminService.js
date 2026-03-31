import apiClient from './apiClient'

export const adminService = {
  async getOverview() {
    const response = await apiClient.get('/admin/overview')
    return response.data
  },
}

export default adminService