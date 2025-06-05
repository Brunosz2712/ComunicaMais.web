import React, { createContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  name: string;
  email: string;
  deviceId: string;
  role: string;
}

interface AuthContextData {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({
  user: null,
  loading: true,
  signIn: async () => false,
  signOut: async () => {},
});

interface Props {
  children: ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carrega usuário do AsyncStorage ao iniciar app
    async function loadStorageData() {
      try {
        const storedUser = await AsyncStorage.getItem('@ComunicaMais:user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.log('Erro ao carregar usuário:', error);
      }
      setLoading(false);
    }
    loadStorageData();
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    // Aqui você pode trocar para consumir API real de autenticação
    // Por hora, vamos fazer mock para teste:
    if (email && password) {
      // Fake user data, substitua com fetch da API
      const fakeUser = {
        id: '1',
        name: 'Alice',
        email,
        deviceId: 'device-alice-001',
        role: 'USER',
      };
      await AsyncStorage.setItem('@ComunicaMais:user', JSON.stringify(fakeUser));
      setUser(fakeUser);
      return true;
    }
    return false;
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('@ComunicaMais:user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
