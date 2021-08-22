import React from 'react';
import {
  Amount,
  Container,
  Footer,
  Header,
  Icon,
  LastTransaction,
  Title,
} from './styles';

type HighlightCardProps = {
  type: 'in' | 'out' | 'total';
  title: string;
  amount: string;
  lastTransaction: string;
};

const icon = {
  in: 'arrow-up-circle',
  out: 'arrow-down-circle',
  total: 'dollar-sign',
};

export function HighlightCard({
  type,
  title,
  amount,
  lastTransaction,
}: HighlightCardProps) {
  return (
    <Container type={type}>
      <Header>
        <Title type={type}>{title}</Title>
        <Icon name={icon[type]} type={type} />
      </Header>

      <Footer>
        <Amount type={type}>{amount}</Amount>
        <LastTransaction type={type}>{lastTransaction}</LastTransaction>
      </Footer>
    </Container>
  );
}
