import { configureStore } from "@reduxjs/toolkit"
import presencaReducer from "./presencaSlice"
import { PRESENCA_KEY } from "../utils/storageKeys"

export const store = configureStore({
    reducer: {
        presenca: presencaReducer
    }
})

store.subscribe(() => {
    localStorage.setItem(PRESENCA_KEY, JSON.stringify(store.getState().presenca.items))
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
