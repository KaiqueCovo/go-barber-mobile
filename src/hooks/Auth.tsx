import React, {
  useState,
  createContext,
  useContext,
  useCallback,
  useEffect,
} from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import api from '../services/api'

interface SignInCredentials {
  email: string
  password: string
}

interface User {
  id: string
  name: string
  email: string
  avatar_url: string
}

interface AuthContextData {
  user: User
  loading: boolean
  signIn({ email, password }: SignInCredentials): Promise<void>
  signOut(): void
}

interface AuthData {
  token: string
  user: User
}

/**
 * Create Context
 */
const AuthContext = createContext<AuthContextData>({} as AuthContextData)

/**
 * Provider
 */
const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthData>({} as AuthData)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@GoBarber:token',
        '@GoBarber:user',
      ])

      if (token[1] && user[1]) {
        setData({
          token: token[1],
          user: JSON.parse(user[1]),
        })
      }

      setLoading(false)
    }

    loadStorageData()
  }, [])

  /**
   * Method sign in
   */
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post<AuthData>('sessions', {
      email,
      password,
    })

    const { user, token } = response.data

    await AsyncStorage.multiSet([
      ['@GoBarber:token', token],
      ['@GoBarber:user', JSON.stringify(user)],
    ])

    setData({ token, user })
  }, [])

  /**
   * Method log out
   */
  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user'])

    setData({} as AuthData)
  }, [])

  return (
    <AuthContext.Provider value={{ user: data.user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Auth Hook
 */
function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export { AuthProvider, useAuth }
