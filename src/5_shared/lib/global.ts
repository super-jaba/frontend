export const BASE_URL =
    import.meta.env.VITE_BASE_URL || 'http://localhost:8000/api'
export const getAccessToken = () => localStorage.getItem('access_token')
export const CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID
