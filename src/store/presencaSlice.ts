import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { PRESENCA_KEY } from "../utils/storageKeys"

interface ItemProps {
    id: number,
    nome: string,
    curso: string
}

interface PresencaState {
    items: ItemProps[]
}

function loadPresencas(): ItemProps[] {
    const dataStorageString = localStorage.getItem(PRESENCA_KEY)
    return dataStorageString ? JSON.parse(dataStorageString) : []
}

const initialState: PresencaState = {
    items: loadPresencas()
}

const presencaSlice = createSlice({
    name: "presenca",
    initialState,
    reducers: {
        addPresenca: (state, action: PayloadAction<ItemProps>) => {
            state.items = [...state.items, action.payload]
        },
        updatePresenca: (state, action: PayloadAction<ItemProps>) => {
            state.items = state.items.map((item) => item.id === action.payload.id ? { ...item, ...action.payload } : item)
        },
        removePresenca: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((item) => item.id !== action.payload)
        },
        clearPresencas: (state) => {
            state.items = []
        }
    }
})

export const { addPresenca, updatePresenca, removePresenca, clearPresencas } = presencaSlice.actions

export default presencaSlice.reducer
