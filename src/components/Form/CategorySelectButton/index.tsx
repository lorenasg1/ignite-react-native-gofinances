import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { CategoryName, Container, Icon } from './styles';

interface SelectInputProps extends RectButtonProps {
  title: string;
  onPress: () => void;
}

export function CategorySelectButton({
  title,
  onPress,
  ...props
}: SelectInputProps) {
  return (
    <Container onPress={onPress} {...props}>
      <CategoryName>{title}</CategoryName>
      <Icon name="chevron-down" />
    </Container>
  );
}
