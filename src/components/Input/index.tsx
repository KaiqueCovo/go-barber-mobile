import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react'
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

interface InputRef {
  focus(): void
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, icon, ...restProps },
  ref
) => {
  const inputElementRef = useRef<any>(null)

  const { registerField, defaultValue = '', fieldName, error } = useField(name)
  const inputValueRef = useRef<inputValueReference>({ value: '' })

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus()
    },
  }))

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

export default forwardRef(Input)
