import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './pages/Home.js';
import Board from './pages/Board.js';
import Finish from './pages/Finish.js';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#282c34" barStyle={'light-content'} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen
          name="Board"
          component={Board}
        />
        <Stack.Screen
          name="Finish"
          component={Finish}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
