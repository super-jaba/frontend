import { DocumentsPage } from '@/1_pages/DocumentsPage'
import { DocumentPage } from '@/1_pages/DocumentPage'

import type { RouteProps } from 'react-router-dom'
import { LoginPage } from '@/1_pages/LoginPage'
import { Navigate } from 'react-router-dom'

export const AppRoutes = {
    DOCUMENTS: 'documents',
    DOCUMENT: 'document',
    LOGIN: 'login',
    INDEX: 'index',
} as const

export type AppRoutes = (typeof AppRoutes)[keyof typeof AppRoutes]

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.INDEX]: '/',
    [AppRoutes.DOCUMENTS]: '/documents',
    [AppRoutes.DOCUMENT]: '/documents/:id',
    [AppRoutes.LOGIN]: '/login',
}

type AppRouteProps = RouteProps & {
    isProtected: boolean
}

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
    [AppRoutes.INDEX]: {
        path: RoutePath.index,
        element: <Navigate to={RoutePath.documents} replace />,
        isProtected: false,
    },
    [AppRoutes.DOCUMENTS]: {
        path: RoutePath.documents,
        element: <DocumentsPage />,
        isProtected: true,
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
