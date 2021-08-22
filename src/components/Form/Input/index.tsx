import React from 'react';
import { TextInputProps } from 'react-native';
import { Container } from './styles';

type InputProps = TextInputProps & {};

export function Input({ ...props }: InputProps) {
  return <Container {...props} />;
}
