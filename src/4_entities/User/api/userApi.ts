import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '@/5_shared/lib/global.ts'

export const userAPI = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
    endpoints: (builder) => ({
        loginWithGithub: builder.mutation<{ access_token: string }, string>({
            query: (code) => ({
                url: '/auth/github/callback',
                method: 'GET',
                params: {
                    code: code,
                },
            }),
        }),
    }),
})

export const { useLoginWithGithubMutation: useLoginWithGithub } = userAPI
