import React, { useCallback, useRef } from 'react'
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import Icon from 'react-native-vector-icons/Feather'
import * as Yup from 'yup'

import getValidationErros from '../../utils/getValidationErrors'

import logo from '../../assets/logo/logo.png'

import Input from '../../components/Input'
import Button from '../../components/Button'

/* Styled Components */
import * as Styled from './styles'

interface SignInFormData {
  email: string
  password: string
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const passwordInputRef = useRef<TextInput>(null)

  const navigation = useNavigation()

  const handleSignIn = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({})

      const schemaValidation = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().required('Senha obrigatória'),
      })

      await schemaValidation.validate(data, {
        abortEarly: false,
      })
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErros(error)
        console.log(errors)
        formRef.current?.setErrors(errors)
      }

      Alert.alert(
        'Erro na autenticação',
        'Ocorreu um erro ao fazer login, cheque as credenciais.'
      )
    }
  }, [])

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
              <Styled.Title>Faça seu Login</Styled.Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus()
                }}
              />
              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Senha"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
            </Form>
            <Button onPress={() => formRef.current?.submitForm()}>
              Entrar
            </Button>

            <Styled.ForgotPassword>
              <Styled.ForgotPasswordText>
                Esqueci minha senha
              </Styled.ForgotPasswordText>
            </Styled.ForgotPassword>
          </Styled.Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <Styled.CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <Styled.CreateAccountButtonText>
          Criar uma conta
        </Styled.CreateAccountButtonText>
      </Styled.CreateAccountButton>
    </>
  )
}

export default SignIn
