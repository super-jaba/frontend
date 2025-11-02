import { HomePage } from '@/1_pages/HomePage'
import { DocumentPage } from '@/1_pages/DocumentPage'

import type { RouteProps } from 'react-router-dom'

export const AppRoutes = {
    HOME: 'home',
    DOCUMENT: 'document',
} as const

export type AppRoutes = (typeof AppRoutes)[keyof typeof AppRoutes]

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.HOME]: '/',
    [AppRoutes.DOCUMENT]: '/document/:id',
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.HOME]: {
        path: RoutePath.home,
        element: <HomePage />,
    },
    [AppRoutes.DOCUMENT]: {
        path: RoutePath.document,
        element: <DocumentPage />,
    },
}
