import { RootReducer } from "./RootReducer"
import { createStore } from "redux"

export const getStore = () => {
    const store = createStore(RootReducer, {})

    return store
}