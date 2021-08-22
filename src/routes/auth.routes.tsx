import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTheme } from 'styled-components/native';
import { SignIn } from '../screens/SignIn';

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="SignIn" component={SignIn} />
    </Navigator>
  );
}
