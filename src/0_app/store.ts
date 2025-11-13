import { configureStore } from '@reduxjs/toolkit'
import { documentsAPI } from '@/4_entities/Documents/api/documentsApi.ts'
import { userAPI } from '@/4_entities/User'
import { referencesAPI } from '@/4_entities/References/api/referencesApi.ts'

export const store = configureStore({
    reducer: {
        [documentsAPI.reducerPath]: documentsAPI.reducer,
        [userAPI.reducerPath]: userAPI.reducer,
        [referencesAPI.reducerPath]: referencesAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            documentsAPI.middleware,
            userAPI.middleware,
            referencesAPI.middleware,
        ),
})
