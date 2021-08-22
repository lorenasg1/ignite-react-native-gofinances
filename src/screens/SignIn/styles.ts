import { Platform } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  width: 100%;
  height: ${Platform.OS === 'ios' ? '70%' : '75%'};

  background-color: ${({ theme }) => theme.colors.primary};

  align-items: center;
  justify-content: flex-end;
`;

export const TitleWrapper = styled.View`
  align-items: center;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(30)}px;
  color: ${({ theme }) => theme.colors.shape};
  text-align: center;

  margin-top: ${RFValue(40)}px;
`;

export const SignInTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.shape};
  text-align: center;

  margin-top: ${RFValue(60)}px;
  margin-bottom: ${RFValue(60)}px;
`;

export const Footer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const FooterContent = styled.View`
  margin-top: ${RFPercentage(-4)}px;
  padding: 0 32px;

  justify-content: space-between;
`;

export const Loading = styled.ActivityIndicator`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
`;
