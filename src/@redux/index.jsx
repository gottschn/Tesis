import  reducer  from  "../@redux/reducer"
import { configureStore } from "@reduxjs/toolkit"

const getStore = () => {

    const clientStore = configureStore ({
        reducer: reducer
    })

    return clientStore
}

export { getStore}