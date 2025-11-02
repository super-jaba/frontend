import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AUTH_TOKEN, BASE_URL } from '@/5_shared/lib/global.ts'
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
                    Authorization: `Bearer ${AUTH_TOKEN}`,
                },
            }),
            transformResponse: (data: ListDocumentsResponse) => data.documents,
            providesTags: ['Document'],
        }),
        uploadDocument: builder.mutation({
            query: (body) => ({
                url: '/upload',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${AUTH_TOKEN}`,
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
