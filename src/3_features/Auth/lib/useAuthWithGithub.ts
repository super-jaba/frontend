import { CLIENT_ID } from '@/5_shared/lib/global.ts'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useLoginWithGithub } from '@/4_entities/User'

export const useAuthWithGithub = () => {
    const [searchParams] = useSearchParams()
    const code = searchParams.get('code')
    const [useGetToken] = useLoginWithGithub()

    useEffect(() => {
        if (code) {
            useGetToken(code)
                .unwrap()
                .then((res) =>
                    localStorage.setItem('access_token', res.access_token),
                )
                .then(() => (window.location.href = '/'))
        }
    }, [])

    const redirect = () => {
        const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=read:user`
        window.location.href = authUrl
    }

    return {
        redirect,
        code,
    }
}
