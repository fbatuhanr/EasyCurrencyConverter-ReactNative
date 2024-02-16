import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { useSelector } from 'react-redux'

import CalculationPage from '../screens/CalculationPage'
import HistoryPage from '../screens/HistoryPage'

const Tab = createBottomTabNavigator()
const UserTab = () => {

  const history = useSelector((state) => state.history)

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Calculation" component={CalculationPage} />
      <Tab.Screen name="History" component={HistoryPage} options={{ tabBarBadge: history && history.length ? history.length : null }} />
    </Tab.Navigator>
  )
}

export default UserTab