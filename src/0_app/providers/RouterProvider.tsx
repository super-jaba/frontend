import { Route, Routes } from 'react-router-dom'
import { routeConfig } from '@/5_shared/config/routerConfig.tsx'

export const RouterProvider = () => {
    return (
        <Routes>
            {Object.values(routeConfig).map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
            ))}
        </Routes>
    )
}
