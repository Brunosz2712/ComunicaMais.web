import React, { createContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../services/api';

interface AuthContextData {
  token: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({
  token: null,
  loading: true,
  signIn: async () => false,
  signOut: async () => {},
});

interface Props {
  children: ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      try {
        const storedToken = await AsyncStorage.getItem('@ComunicaMais:token');
        if (storedToken) {
          setToken(storedToken);
          console.log('Token carregado do storage:', storedToken);
        }
      } catch (error) {
        console.error('Erro ao carregar token do AsyncStorage:', error);
      } finally {
        setLoading(false);
      }
    }

    loadStorageData();
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await login(email, password);
      const tokenResponse = response.data.token; // ou response.data.jwt, conforme sua API

      await AsyncStorage.setItem('@ComunicaMais:token', tokenResponse);
      setToken(tokenResponse);
      console.log('Token recebido e salvo:', tokenResponse);
      return true;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return false;
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('@ComunicaMais:token');
      setToken(null);
      console.log('Token removido, usuário deslogado.');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ token, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
