import { HomePage } from '@/1_pages/HomePage'
import { DocumentPage } from '@/1_pages/DocumentPage'

import type { RouteProps } from 'react-router-dom'
import { LoginPage } from '@/1_pages/LoginPage'

export const AppRoutes = {
    HOME: 'home',
    DOCUMENT: 'document',
    LOGIN: 'login',
} as const

export type AppRoutes = (typeof AppRoutes)[keyof typeof AppRoutes]

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.HOME]: '/',
    [AppRoutes.DOCUMENT]: '/document/:id',
    [AppRoutes.LOGIN]: '/login',
}

type AppRouteProps = RouteProps & {
    isProtected: boolean
}

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
    [AppRoutes.HOME]: {
        path: RoutePath.home,
        element: <HomePage />,
        isProtected: false,
    },
    [AppRoutes.DOCUMENT]: {
        path: RoutePath.document,
        element: <DocumentPage />,
        isProtected: true,
    },
    [AppRoutes.LOGIN]: {
        path: RoutePath.login,
        element: <LoginPage />,
        isProtected: false,
    },
}
