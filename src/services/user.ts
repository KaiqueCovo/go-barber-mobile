import api from './api'

interface CreateUser {
  name: string
  email: string
  password: string
}

class UserService {
  create({ name, email, password }: CreateUser) {
    return api.post('users', { name, email, password })
  }
}

export default new UserService()
