import { Route, Routes } from 'react-router-dom'
import { routeConfig } from '@/5_shared/config/routerConfig.tsx'
import { ProtectedRoute } from '@/5_shared/ui/ProtectedRoute/ProtectedRoute.tsx'

export const RouterProvider = () => {
    return (
        <Routes>
            {Object.values(routeConfig).map(
                ({ path, element, isProtected }) => {
                    return (
                        <Route
                            key={path}
                            path={path}
                            element={
                                isProtected ? (
                                    <ProtectedRoute>{element}</ProtectedRoute>
                                ) : (
                                    element
                                )
                            }
                        />
                    )
                },
            )}
        </Routes>
    )
}
