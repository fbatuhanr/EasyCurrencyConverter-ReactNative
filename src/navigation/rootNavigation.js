import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import StartStack from './StartStack'

const rootNavigation = () => {

  return (
    <NavigationContainer>
        <StartStack />
    </NavigationContainer>
  )
}

export default rootNavigation