import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getAccessToken, BASE_URL } from '@/5_shared/lib/global.ts'
import type { Document, ListDocumentsResponse } from '../model/types'

export const documentsAPI = createApi({
    reducerPath: 'documentsAPI',
    baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/documents` }),
    tagTypes: ['Document'],
    endpoints: (builder) => ({
        listDocuments: builder.query<Document[], void>({
            query: () => ({
                url: '',
                headers: {
                    Authorization: `Bearer ${getAccessToken()}`,
                },
            }),
            transformResponse: (data: ListDocumentsResponse) => data.documents,
            providesTags: ['Document'],
        }),
        uploadDocument: builder.mutation<Document, FormData>({
            query: (body) => ({
                url: '/upload',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${getAccessToken()}`,
                },
                body: body,
            }),
            invalidatesTags: ['Document'],
        }),
    }),
})

export const {
    useListDocumentsQuery: useListDocuments,
    useUploadDocumentMutation: useUploadDocument,
} = documentsAPI
