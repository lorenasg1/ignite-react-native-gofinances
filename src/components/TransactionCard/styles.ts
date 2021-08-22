import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

type TransactionProps = {
  type: 'in' | 'out';
};

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(14)}px;
`;

export const Amount = styled.Text<TransactionProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
  margin-top: 2px;
  color: ${({ theme, type }) =>
    type === 'in' ? theme.colors.success : theme.colors.attention};
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${RFValue(16)}px;
`;

export const Category = styled.View`
  flex-direction: row;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const CategoryName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(14)}px;
  margin-left: 10px;
`;

export const Date = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(14)}px;
`;
