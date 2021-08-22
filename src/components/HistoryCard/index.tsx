import React from 'react';
import { Amount, Container, ContainerBorder, Content, Title } from './styles';

interface HistoryCardProps {
  title: string;
  amount: string;
  color: string;
}

export function HistoryCard({ title, amount, color }: HistoryCardProps) {
  return (
    <Container>
      <ContainerBorder color={color} />

      <Content>
        <Title>{title}</Title>
        <Amount>{amount}</Amount>
      </Content>
    </Container>
  );
}
