import React from 'react'
import {View, Text, Button} from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Calculation from './src/screens/CalculationPage'
import HomePage from './src/screens/HomePage';
import HistoryPage from './src/screens/HistoryPage';

import { NativeWindStyleSheet } from "nativewind";
NativeWindStyleSheet.setOutput({ default: "native" });

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="Calculation" component={Calculation} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="History" component={HistoryPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}