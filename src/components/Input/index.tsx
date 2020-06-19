import React, { useEffect, useRef } from 'react'
import { TextInputProps } from 'react-native'
import { useField } from '@unform/core'
import Icon from 'react-native-vector-icons/Feather'

import * as Styled from './styles'

interface InputProps extends TextInputProps {
  name: string
  icon: string
}

interface inputValueReference {
  value: string
}

const Button: React.FC<InputProps> = ({ name, icon, ...restProps }) => {
  const inputElementRef = useRef<any>(null)

  const { registerField, defaultValue = '', fieldName, error } = useField(name)
  const inputValueRef = useRef<inputValueReference>({ value: '' })

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value: string) {
        inputValueRef.current.value = value
        inputElementRef.current.setNativeProps({ text: value })
      },
      clearValue() {
        inputValueRef.current.value = ''
        inputElementRef.current.clear()
      },
    })
  }, [registerField, fieldName])

  return (
    <Styled.Container>
      <Icon name={icon} size={20} color="#666360" />
      <Styled.TextInput
        ref={inputElementRef}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        defaultValue={defaultValue}
        onChangeText={value => (inputValueRef.current.value = value)}
        {...restProps}
      />
    </Styled.Container>
  )
}

export default Button
