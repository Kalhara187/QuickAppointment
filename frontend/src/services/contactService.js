import apiClient from './appointmentService'

export const contactService = {
  async submitContactForm(data) {
    const response = await apiClient.post('/contact', data)
    return response.data
  },
}

export default contactService