import React from 'react'

import { AuthProvider } from './auth'

const GlobalProvider: React.FC = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
)

export default GlobalProvider
