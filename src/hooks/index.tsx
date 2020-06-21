import React from 'react'

import { AuthProvider } from './Auth'

const GlobalProvider: React.FC = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
)

export default GlobalProvider
