import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface ContainerBorderProps {
  color: string;
}

export const Container = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.shape};
  height: 48px;

  flex-direction: row;
  align-items: center;

  border-radius: 6px;

  margin-bottom: 8px;
`;

export const ContainerBorder = styled.View<ContainerBorderProps>`
  width: 4px;
  height: 100%;
  padding: -13px -20px;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  background-color: ${({ color }) => color};
`;

export const Content = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 13px 20px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const Amount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.title};
`;
