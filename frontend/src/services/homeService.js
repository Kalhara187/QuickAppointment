import apiClient from './apiClient'

export const homeService = {
  async getHomeData(params = {}) {
    const response = await apiClient.get('/home', { params })
    return response.data
  },
}

export default homeService