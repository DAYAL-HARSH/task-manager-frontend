import axios from 'axios'

const API = axios.create({
  baseURL: 'https://task-manager-api-production-6b48.up.railway.app'
})

export default API