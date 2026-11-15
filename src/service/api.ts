import axios from "axios"
import { useAuth } from "../hooks/useAuth"

export const api = axios.create({ baseURL: 'http://localhost:3001' })

const { token } = useAuth.getState()

api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

useAuth.subscribe((state) => {
   api.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
})


api.interceptors.response.use((response) => response, (error) => {
   if (error.response?.status === 401) {
      useAuth.getState().clearUser()
      window.location.href = "/"
   }

   return Promise.reject(error)
})
