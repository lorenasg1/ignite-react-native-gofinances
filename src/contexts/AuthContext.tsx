import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as AuthSession from 'expo-auth-session';
import React, { createContext, ReactNode, useEffect, useState } from 'react';

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;
const { AUTH_URL } = process.env;

interface User {
  id: string;
  name: string;
  email: string;
  photo: string | undefined;
}

interface AuthContextData {
  user: User;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
  isLoadingStoredUser: boolean;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [isLoadingStoredUser, setIsLoadingStoredUser] = useState(true);

  const collectionKey = 'gofinances.user';

  async function signInWithGoogle() {
    try {
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl = `${AUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationResponse;

      if (type === 'success') {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        );

        const userInfo = await response.json();

        const authenticatedUser = {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture,
        };

        setUser(authenticatedUser);
        await AsyncStorage.setItem(
          collectionKey,
          JSON.stringify(authenticatedUser)
        );
      }
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credential) {
        const name = credential.fullName!.givenName!;
        const photo = `https://ui-avatars.com/api/?name=${name}&length=1`;
        const authenticatedUser = {
          id: String(credential.user),
          email: credential.email!,
          name,
          photo,
        };
        setUser(authenticatedUser);
        await AsyncStorage.setItem(
          collectionKey,
          JSON.stringify(authenticatedUser)
        );
      }
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async function signOut() {
    setUser({} as User);
    await AsyncStorage.removeItem(collectionKey);
  }

  useEffect(() => {
    async function loadStoredUser() {
      const storedUser = await AsyncStorage.getItem(collectionKey);

      if (storedUser) {
        const authenticatedUser = JSON.parse(storedUser) as User;
        setUser(authenticatedUser);
        setIsLoadingStoredUser(false);

        console.log(authenticatedUser);
      }
    }

    loadStoredUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        signInWithApple,
        signOut,
        isLoadingStoredUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
