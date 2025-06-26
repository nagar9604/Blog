import authSlice from "./authSlice";
import themeSlice from "./themeSlice";

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
    
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import blogSlice from "./blogSlice"; 
import commentSlice from "./commentSlice";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}


const rootReducer = combineReducers({
    auth: authSlice,
    theme: themeSlice,
    blog: blogSlice,
    comment:commentSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})




export default store;