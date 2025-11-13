import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getAccessToken, BASE_URL } from '@/5_shared/lib/global.ts'
import type {
    Reference,
    CreateReferenceDto,
    UpdateReferenceDto,
    ListReferencesResponse,
} from '../model/types'

export const referencesAPI = createApi({
    reducerPath: 'referencesAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/references`,
        prepareHeaders: (headers) => {
            headers.set('ngrok-skip-browser-warning', 'true')
            return headers
        },
    }),
    tagTypes: ['Reference'],
    endpoints: (builder) => ({
        listReferences: builder.query<
            Reference[],
            {
                skip?: number
                limit?: number
                document_id?: string | null
                reference_type?: string | null
            } | void
        >({
            query: (params) => ({
                url: '',
                params: params || {},
                headers: {
                    Authorization: `Bearer ${getAccessToken()}`,
                },
            }),
            transformResponse: (data: ListReferencesResponse) => data.references,
            providesTags: ['Reference'],
        }),
        createReference: builder.mutation<Reference, CreateReferenceDto>({
            query: (body) => ({
                url: '',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${getAccessToken()}`,
                    'Content-Type': 'application/json',
                },
                body,
            }),
            invalidatesTags: ['Reference'],
        }),
        updateReference: builder.mutation<
            Reference,
            { id: string; body: UpdateReferenceDto }
        >({
            query: ({ id, body }) => ({
                url: `/${id}`,
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${getAccessToken()}`,
                    'Content-Type': 'application/json',
                },
                body,
            }),
            invalidatesTags: ['Reference'],
        }),
    }),
})

export const {
    useListReferencesQuery: useListReferences,
    useCreateReferenceMutation: useCreateReference,
    useUpdateReferenceMutation: useUpdateReference,
} = referencesAPI

