import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    history: []
}

export const historySlice = createSlice({
    name: 'HistorySlice',
    initialState,
    reducers: {
        addHistory: (state, action) => {
            state.history.push(action.payload)
        },
        removeFromHistory: (state, action) => {
            state.history.splice(action.payload, 1);
        },
        clearHistory: (state) => {
            state.history = []
        }
    }
})

export const { addHistory, removeFromHistory, clearHistory } = historySlice.actions
export default historySlice.reducer