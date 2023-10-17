import { defineStore } from 'pinia'
import axios from 'axios'
import { IUserData } from '@/models'

export const useAuthStore = defineStore('auth', {
  actions: {
    async getUser(login: string, password: string) {
      let isResponse = false;

      try {
        const response = await axios.get(`http://localhost:3000/users?user=${login}&password=${password}`)

        const [user] = response.data

        if (!user) return isResponse

        const userData: IUserData = { user: user.user, name: user.name, role: user.role }
        localStorage.setItem('userData', JSON.stringify(userData))

        isResponse = true
      } catch (error) {
        console.error('Error', error)
      }

      return isResponse
    },
    async updateUserData(login: string) {
      let isResponse = false;

      try {
        const response = await axios.get(`http://localhost:3000/users?user=${login}`)

        const [user] = response.data

        if (!user) return isResponse

        const userData = { user: user.user, name: user.name, role: user.role }
        localStorage.setItem('userData', JSON.stringify(userData))

        isResponse = true
      } catch (error) {
        console.error('Error', error)
      }

      return isResponse
    },
  }
})