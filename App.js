import React from 'react'
import RootNavigation from './src/navigation/rootNavigation'

import { NativeWindStyleSheet } from "nativewind"
NativeWindStyleSheet.setOutput({ default: "native" })

import { store } from './src/redux/app/store'
import { Provider } from 'react-redux'

export default function App() {

  return (
    <Provider store={store}>
      <RootNavigation/>
    </Provider>
  )
}