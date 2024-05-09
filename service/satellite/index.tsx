// import { APIKey } from '@utils/environment'
import axios from 'axios'

const satellite = axios.create({
  // baseURL: APIKey,
  timeout: 5000, 
  headers: {
    // 'Content-Type': 'application/json',
  },
})

// Menambahkan interceptor ketika menerima response
satellite.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default satellite
