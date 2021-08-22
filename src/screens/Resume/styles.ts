import { Feather } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};

  width: 100%;
  height: ${getStatusBarHeight() + RFValue(82)}px;

  align-items: center;
  justify-content: flex-end;

  padding-bottom: ${RFValue(20)}px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
`;

export const Loading = styled.ActivityIndicator`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.ScrollView``;

export const MonthSelect = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const MonthSelectButton = styled(BorderlessButton)`
  /* background-color: red; */
  padding: 16px;
`;

export const Month = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(20)}px;
`;

export const MonthSelectIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
`;

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
  margin-bottom: 8px;
`;
