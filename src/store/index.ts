import { configureStore } from "@reduxjs/toolkit"
import presencaReducer from "./presencaSlice"

export const store = configureStore({
    reducer: {
        presenca: presencaReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
