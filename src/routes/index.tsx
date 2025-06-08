import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../pages/Welcome';
import Signin from '../pages/SignIn';
import Register from '../pages/Register';
import Messages from '../pages/Messages';
import CreateMessage from '../pages/CreateMessage';
import Devices from '../pages/Devices';
import SendMessage from '../pages/SendMessage';
import { AuthContext } from '../contexts/AuthContext';
import { ActivityIndicator, View } from 'react-native';

export type RootStackParamList = {
  Welcome: undefined;
  Signin: undefined;
  Register: undefined;
  Messages: undefined;
  CreateMessage: undefined;
  RegisterDevice: undefined;
  RegisteredDevice: undefined;
  Devices: undefined;
  SendMessage: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  const { token, loading } = useContext(AuthContext); // <-- trocado 'user' por 'token'

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!token ? ( // <-- trocado 'user' por 'token'
        <>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="Register" component={Register} />
        </>
      ) : (
        <>
          <Stack.Screen name="Messages" component={Messages} />
          <Stack.Screen name="CreateMessage" component={CreateMessage} />
          <Stack.Screen name="Devices" component={Devices} />
          <Stack.Screen name="SendMessage" component={SendMessage} />
        </>
      )}
    </Stack.Navigator>
  );
}
