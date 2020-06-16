import React from 'react'
import { TextInputProps } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import * as Styled from './styles'

interface InputProps extends TextInputProps {
  name: string
  icon: string
}
const Button: React.FC<InputProps> = ({ name, icon, ...restProps }) => (
  <Styled.Container>
    <Icon name={icon} size={20} color="#666360" />
    <Styled.TextInput
      keyboardAppearance="dark"
      placeholderTextColor="#666360"
      {...restProps}
    />
  </Styled.Container>
)

export default Button
