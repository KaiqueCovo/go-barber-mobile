import React from 'react'
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'

import logo from '../../assets/logo/logo.png'

import Input from '../../components/Input'
import Button from '../../components/Button'

/* Styled Components */
import * as Styled from './styles'

const SignUp: React.FC = () => {
  const navigation = useNavigation()

  return (
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
              <Styled.Title>Crie sua conta</Styled.Title>
            </View>

            <Input name="name" icon="user" placeholder="Nome" />
            <Input name="email" icon="mail" placeholder="E-mail" />
            <Input name="password" icon="lock" placeholder="Senha" />

            <Button>Entrar</Button>
          </Styled.Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <Styled.BackToSignInButton onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <Styled.BackToSignInButtonText>
          Voltar para login
        </Styled.BackToSignInButtonText>
      </Styled.BackToSignInButton>
    </>
  )
}

export default SignUp
