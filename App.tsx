import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from './src/pages/Welcome';
import SignIn from './src/pages/SignIn';
import RegisterDevice from './src/pages/RegisterDevice';
import RegisteredDevice from './src/pages/RegisteredDevice';
import Register from './src/pages/Register';
import Messages from './src/pages/Messages';
import CreateMessage from './src/pages/CreateMessage';

export type RootStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
  RegisterDevice: undefined;
  RegisteredDevice: undefined;
  Register: undefined;
  Messages: undefined;
  CreateMessage: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="RegisterDevice" component={RegisterDevice} />
        <Stack.Screen name="RegisteredDevice" component={RegisteredDevice} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Messages" component={Messages} />
        <Stack.Screen name="CreateMessage" component={CreateMessage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
