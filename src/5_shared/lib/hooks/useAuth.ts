import { getAccessToken } from '../global'

export const useAuth = () => {
    const token = getAccessToken()

    const isAuthenticated = !!token

    return {
        isAuthenticated,
    }
}
