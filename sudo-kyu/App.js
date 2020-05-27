import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './pages/Home.js';
import Board from './pages/Board.js';
import Finish from './pages/Finish.js';

const Stack = createStackNavigator();

export default function App() {
  const [leaderBoard, setLeaderBoard] = useState([
    // { name: 'Matt', diff: 'hard', time: 4321, score: 999 },
    // { name: 'Dom', diff: 'medium', time: 5432, score: 888 },
    // { name: 'Chris', diff: 'easy', time: 6543, score: 777 },
    // { name: 'Bella', diff: 'hard', time: 7654, score: 666 },
    // { name: 'Howie', diff: 'medium', time: 8765, score: 555 },
    // { name: 'Wolst', diff: 'easy', time: 9876, score: 444 },
    // { name: 'Holme', diff: 'hard', time: 1234, score: 333 },
    // { name: 'Ella', diff: 'medium', time: 3456, score: 222 },
    // { name: 'Evan', diff: 'easy', time: 5678, score: 111 },
    // { name: 'Bing', diff: 'hard', time: 7890, score: 999 }
  ]);
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor="#282c34"
        barStyle={'light-content'}
      />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen name="Board">
          {props => (
            <Board
              {...props}
              leaderBoard={leaderBoard}
              setLeaderBoard={setLeaderBoard}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Finish">
          {props => (
            <Finish
              {...props}
              leaderBoard={leaderBoard}
              setLeaderBoard={setLeaderBoard}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
