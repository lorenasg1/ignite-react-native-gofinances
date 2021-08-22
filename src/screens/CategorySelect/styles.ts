import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

type CategoryProps = {
  isActive: boolean;
};

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(82)}px;
  background-color: ${({ theme }) => theme.colors.primary};

  align-items: center;
  justify-content: flex-end;

  padding-bottom: ${RFValue(20)}px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
`;

export const CategoryItem = styled(TouchableOpacity)<CategoryProps>`
  flex: 1;
  padding: ${RFValue(24)}px;

  flex-direction: row;
  align-items: center;

  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.secondary_light : theme.colors.background};
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  margin-right: 16px;
`;

export const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(14)}px;
`;

export const Divider = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.text_light};
`;

export const Footer = styled.View`
  width: 100%;
  padding: 24px;
`;
