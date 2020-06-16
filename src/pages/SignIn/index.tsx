import React from 'react'
import { Image } from 'react-native'

import logo from '../../assets/logo/logo.png'

import Input from '../../components/Input'
import Button from '../../components/Button'

/* Styled Components */
import * as Styled from './styles'

const SignIn: React.FC = () => (
  <Styled.Container>
    <Image source={logo} />
    <Styled.Title>Faça seu Login</Styled.Title>

    <Input name="email" icon="mail" placeholder="E-mail" />
    <Input name="password" icon="lock" placeholder="Senha" />

    <Button>Entrar</Button>
  </Styled.Container>
)

export default SignIn
