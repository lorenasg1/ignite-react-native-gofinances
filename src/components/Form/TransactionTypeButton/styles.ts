import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

type IconProps = {
  type: 'in' | 'out';
};

type ContainerProps = IconProps & {
  isActive: boolean;
};

export const Container = styled.View<ContainerProps>`
  width: 49%;
  height: 56px;

  border-width: ${({ isActive }) => (isActive ? 0 : 1.5)}px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text_light};
  border-radius: 6px;
`;

export const Button = styled(RectButton)<ContainerProps>`
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  border-color: transparent;
  border-radius: 6px;
  padding: 16px;

  ${({ type, isActive }) =>
    isActive &&
    type === 'in' &&
    css`
      background-color: ${({ theme }) => theme.colors.success_light};
      border-width: 1.5px;
      border-color: ${({ theme }) => theme.colors.success_light};
    `}

  ${({ type, isActive }) =>
    isActive &&
    type === 'out' &&
    css`
      background-color: ${({ theme }) => theme.colors.attention_light};
      border-width: 1.5px;
      border-color: ${({ theme }) => theme.colors.attention_light};
    `}
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;

  color: ${({ theme, type }) =>
    type === 'in' ? theme.colors.success : theme.colors.attention};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.title};

  font-size: ${RFValue(14)}px;
`;
