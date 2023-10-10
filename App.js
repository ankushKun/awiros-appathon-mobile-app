import { Text, View, } from 'react-native';
import { useEffect } from 'react';
import * as Updates from 'expo-updates';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from "./src";
import Login from './src/login';
import Profile from './src/profile';

const Stack = createNativeStackNavigator();



export default function App() {
  function CheckUpdates() {
    Updates.addListener(event => {
      if (event.type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
        alert("Update available, Restart app")
        Updates.reloadAsync()
      }
    })
  }

  useEffect(() => CheckUpdates(), [])

  return <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Index} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
}
