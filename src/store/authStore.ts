import { defineStore } from 'pinia'
import axios from 'axios'
import { IUserData } from '@/models'

interface AuthState {
  userData: IUserData | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    userData: {
      name: '',
      role: ''
    },
  }),
  actions: {
    async getUser(login: string, password: string) {
      try {
        const response = await axios.get(`http://localhost:3000/users?user=${login}&password=${password}`)

        const [user] = response.data

        if (!user) return false

        this.userData = { name: user.name, role: user.role }
        localStorage.setItem('userData', JSON.stringify(this.userData))

        return true
      } catch (error) {
        console.error('Error', error)
      }
    },
  }
})