import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { Container, Icon, Title, Button } from './styles';

type TransactionTypeButtonProps = RectButtonProps & {
  type: 'in' | 'out';
  title: string;
  isActive: boolean;
};

const icons = {
  in: 'arrow-up-circle',
  out: 'arrow-down-circle',
};

export function TransactionTypeButton({
  type,
  title,
  isActive,
  ...props
}: TransactionTypeButtonProps) {
  return (
    <Container type={type} isActive={isActive}>
      <Button {...props} type={type} isActive={isActive}>
        <Icon name={icons[type]} type={type} />
        <Title>{title}</Title>
      </Button>
    </Container>
  );
}
