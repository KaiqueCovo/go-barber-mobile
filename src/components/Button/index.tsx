import React from 'react'
import { RectButtonProperties } from 'react-native-gesture-handler'

import * as Styled from './styles'

interface ButtonProps extends RectButtonProperties {
  children: string
}

const Input: React.FC<ButtonProps> = ({ children, ...restProps }) => (
  <Styled.Container {...restProps}>
    <Styled.ButtonText>{children}</Styled.ButtonText>
  </Styled.Container>
)

export default Input
