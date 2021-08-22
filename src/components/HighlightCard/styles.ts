import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

type TypeProps = {
  type: 'in' | 'out' | 'total';
};

export const Container = styled.View<TypeProps>`
  background-color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.secondary : theme.colors.shape};

  width: ${RFValue(300)}px;
  border-radius: 6px;

  padding: 20px 24px;
  padding-bottom: ${RFValue(28)}px;
  margin-right: 16px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;

  color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.shape : theme.colors.title};
`;

export const Icon = styled(Feather)<TypeProps>`
  font-size: ${RFValue(40)}px;

  ${({ type }) =>
    type === 'in' &&
    css`
      color: ${({ theme }) => theme.colors.success};
    `};

  ${({ type }) =>
    type === 'out' &&
    css`
      color: ${({ theme }) => theme.colors.attention};
    `};

  ${({ type }) =>
    type === 'total' &&
    css`
      color: ${({ theme }) => theme.colors.shape};
    `};
`;

export const Footer = styled.View``;

export const Amount = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;

  color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.shape : theme.colors.title};

  margin-top: ${RFValue(16)}px;
`;

export const LastTransaction = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;

  color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.shape : theme.colors.text};
`;
