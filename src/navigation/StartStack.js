import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from '../screens/HomePage';
import UserTab from './UserTab'

const Stack = createNativeStackNavigator();
const StartStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="CalculationPage" component={UserTab} />
    </Stack.Navigator>
  )
}

export default StartStack