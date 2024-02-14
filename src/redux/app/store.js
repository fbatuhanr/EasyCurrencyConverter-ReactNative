import { configureStore } from '@reduxjs/toolkit'
import historyReducer from '../features/historySlice'

export const store = configureStore({
  reducer: {
    history: historyReducer
  }
})