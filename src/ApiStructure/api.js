import axios from 'axios'
import { toast } from 'react-toastify'

const api = axios.create({
  baseURL: `http://localhost:9000/api`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// HandleRequest
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      console.log('Sending token in header:', config.headers.Authorization)
    } else {
      console.log('No token found in localStorage.')
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// Handle Response
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized! Redirect to login.')
      toast.error('Unauthorized! Redirect to login.')
      localStorage.removeItem('token')
      localStorage.removeItem('name')
      localStorage.removeItem('email')
      localStorage.removeItem('editId')

      window.location.href = '/'
    } else {
      // Handle cases where there's no response (e.g., network errors)
      console.error('Network error or no response:', error.message)
    }
    return Promise.reject(error) // Always reject the error
  }
)
export default api
