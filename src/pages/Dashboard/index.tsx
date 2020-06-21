import React from 'react'
import { View, Button } from 'react-native'

import { useAuth } from '../../hooks/auth'

const Dashboard: React.FC = () => {
  const auth = useAuth()
  return (
    <View>
      <Button title="sair" onPress={auth.signOut}></Button>
    </View>
  )
}

export default Dashboard
