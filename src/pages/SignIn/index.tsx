import React from 'react'
import { Image } from 'react-native'

import logo from '../../assets/logo/logo.png'

/* Styled Components */
import * as Styled from './styles'

const SignIn: React.FC = () => (
  <Styled.Container>
    <Image source={logo} />
  </Styled.Container>
)

export default SignIn
