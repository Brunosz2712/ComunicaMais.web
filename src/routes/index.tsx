import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../pages/Welcome';
import Signin from '../pages/SignIn';
import Register from '../pages/Register';
import Messages from '../pages/Messages';
import CreateMessage from '../pages/CreateMessage';
import RegisterDevice from '../pages/RegisterDevice';
import RegisteredDevice from '../pages/RegisteredDevice';
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
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="Register" component={Register} />
        </>
      ) : (
        <>
          <Stack.Screen name="Messages" component={Messages} />
          <Stack.Screen name="CreateMessage" component={CreateMessage} />
          <Stack.Screen name="RegisteredDevice" component={RegisteredDevice} />
          <Stack.Screen name="RegisterDevice" component={RegisterDevice} />
        </>
      )}
    </Stack.Navigator>
  );
}
