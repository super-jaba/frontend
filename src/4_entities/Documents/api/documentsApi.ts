import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getAccessToken, BASE_URL } from '@/5_shared/lib/global.ts'
import type { Document, ListDocumentsResponse } from '../model/types'

export const documentsAPI = createApi({
    reducerPath: 'documentsAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/documents`,
        prepareHeaders: (headers) => {
            headers.set('ngrok-skip-browser-warning', 'true')
            return headers
        },
    }),
    tagTypes: ['Document'],
    endpoints: (builder) => ({
        getDocument: builder.query<Document, string>({
            query: (id) => ({
                url: `/${id}`,
                headers: {
                    Authorization: `Bearer ${getAccessToken()}`,
                },
            }),
            providesTags: (_result, _error, id) => [{ type: 'Document', id }],
        }),
        listDocuments: builder.query<
            Document[],
            {
                skip?: number
                limit?: number
            } | void
        >({
            query: (params) => ({
                url: '',
                params: params || {},
                headers: {
                    Authorization: `Bearer ${getAccessToken()}`,
                },
            }),
            transformResponse: (data: ListDocumentsResponse) => data.documents,
            providesTags: ['Document'],
        }),
        uploadDocument: builder.mutation<
            Document,
            { file: File; extract_after_upload: boolean }
        >({
            query: ({ file, extract_after_upload }) => {
                const formData = new FormData()
                formData.append('file', file)
                formData.append(
                    'extract_after_upload',
                    String(extract_after_upload),
                )
                return {
                    url: '/upload',
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${getAccessToken()}`,
                    },
                    body: formData,
                }
            },
            invalidatesTags: ['Document'],
        }),
        extractReferences: builder.mutation<Document, string>({
            query: (documentId) => ({
                url: `/${documentId}/extract-references`,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${getAccessToken()}`,
                },
            }),
            invalidatesTags: ['Document'],
        }),
    }),
})

export const {
    useGetDocumentQuery,
    useListDocumentsQuery: useListDocuments,
    useUploadDocumentMutation: useUploadDocument,
    useExtractReferencesMutation: useExtractReferences,
} = documentsAPI
