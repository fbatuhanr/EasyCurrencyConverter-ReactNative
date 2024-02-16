import React from 'react'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/redux/app/store'

import RootNavigation from './src/navigation/rootNavigation'

import { NativeWindStyleSheet } from "nativewind"
NativeWindStyleSheet.setOutput({ default: "native" })

export default function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigation/>
      </PersistGate>
    </Provider>
  )
}