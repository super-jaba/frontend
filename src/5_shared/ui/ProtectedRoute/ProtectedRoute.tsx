import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

interface Props {
    children: ReactNode
}
export const ProtectedRoute = (props: Props) => {
    const { children } = props
    const token = localStorage.getItem('access_token')
    if (!token) return <Navigate to={'/login'} />
    return children
}
