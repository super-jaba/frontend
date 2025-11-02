import { configureStore } from '@reduxjs/toolkit'
import { documentsAPI } from '@/4_entities/Documents/api/documentsApi.ts'

export const store = configureStore({
    reducer: {
        [documentsAPI.reducerPath]: documentsAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(documentsAPI.middleware),
})
