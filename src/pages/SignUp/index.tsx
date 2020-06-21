import React, { useRef, useCallback } from 'react'
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
import { showMessage, hideMessage } from 'react-native-flash-message'
import * as Yup from 'yup'

import getValidationErros from '../../utils/getValidationErrors'

import UserService from '../../services/user'

import logo from '../../assets/logo/logo.png'

import Input from '../../components/Input'
import Button from '../../components/Button'

/* Styled Components */
import * as Styled from './styles'

interface SignUpFormData {
  name: string
  email: string
  password: string
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const emailInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)

  const navigation = useNavigation()

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({})

        const schemaValidation = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'Senha no mínimo 6 dígitos'),
        })

        await schemaValidation.validate(data, {
          abortEarly: false,
        })

        await UserService.create(data)

        showMessage({
          message: 'Cadastro realizado!',
          description: 'Você já pode fazer login na aplicação',
          type: 'success',
          icon: 'success',
          duration: 3000,
        })

        navigation.goBack()
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErros(error)
          formRef.current?.setErrors(errors)
        }

        showMessage({
          message: 'Erro no cadastro!',
          description: 'Verifique se os campos foram preenchidos',
          type: 'danger',
          icon: 'danger',
          duration: 3000,
        })
      }
    },
    [navigation]
  )

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

            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                autoCorrect={false}
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus()
                }}
              />
              <Input
                ref={emailInputRef}
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
                textContentType="newPassword"
                onSubmitEditing={() => {
                  formRef.current?.submitForm()
                }}
              />
            </Form>
            <Button onPress={() => formRef.current?.submitForm()}>
              Entrar
            </Button>
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
