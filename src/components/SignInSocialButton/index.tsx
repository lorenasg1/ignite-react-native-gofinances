import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';
import { Button, ImageContainer, Title } from './styles';

export interface SignInSocialButtonProps extends RectButtonProps {
  title: string;
  svg: React.FC<SvgProps>;
}

export function SignInSocialButton({
  title,
  svg: Svg,
  ...props
}: SignInSocialButtonProps) {
  return (
    <Button {...props}>
      <ImageContainer>
        <Svg />
      </ImageContainer>

      <Title>{title}</Title>
    </Button>
  );
}
