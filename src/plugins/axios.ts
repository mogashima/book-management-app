import axios from 'axios'
import router from '@/router'

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials = true // Cookie による認証を維持

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default axios
