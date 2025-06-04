import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Welcome from "../pages/Welcome";
import SignIn from "../pages/SignIn";
import Register from "../pages/Register";
import RegisterDevice from "../pages/RegisterDevice";
import RegisteredDevice from "../pages/RegisteredDevice";
import Messages from "../pages/Messages";  // <-- import Messages

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="RegisterDevice" component={RegisterDevice} />
        <Stack.Screen name="RegisteredDevice" component={RegisteredDevice} />
        <Stack.Screen name="Messages" component={Messages} />  
      </Stack.Navigator>
    </NavigationContainer>
  );
}
