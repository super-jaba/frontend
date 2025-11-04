import { configureStore } from '@reduxjs/toolkit'
import { documentsAPI } from '@/4_entities/Documents/api/documentsApi.ts'
import { userAPI } from '@/4_entities/User'

export const store = configureStore({
    reducer: {
        [documentsAPI.reducerPath]: documentsAPI.reducer,
        [userAPI.reducerPath]: userAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            documentsAPI.middleware,
            userAPI.middleware,
        ),
})
