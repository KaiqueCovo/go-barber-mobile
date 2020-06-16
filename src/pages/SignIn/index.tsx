import React from 'react'
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import logo from '../../assets/logo/logo.png'

import Input from '../../components/Input'
import Button from '../../components/Button'

/* Styled Components */
import * as Styled from './styles'

const SignIn: React.FC = () => (
  <>
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Styled.Container>
          <Image source={logo} />
          <View>
            <Styled.Title>Faça seu Login</Styled.Title>
          </View>

          <Input name="email" icon="mail" placeholder="E-mail" />
          <Input name="password" icon="lock" placeholder="Senha" />

          <Button>Entrar</Button>

          <Styled.ForgotPassword>
            <Styled.ForgotPasswordText>
              Esqueci minha senha
            </Styled.ForgotPasswordText>
          </Styled.ForgotPassword>
        </Styled.Container>
      </ScrollView>
    </KeyboardAvoidingView>

    <Styled.CreateAccountButton>
      <Icon name="log-in" size={20} color="#ff9000" />
      <Styled.CreateAccountButtonText>
        Criar uma conta
      </Styled.CreateAccountButtonText>
    </Styled.CreateAccountButton>
  </>
)

export default SignIn
