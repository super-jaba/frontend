import './styles/App.css'
import { RouterProvider } from './providers/RouterProvider.tsx'
import cls from '@/0_app/App.module.css'
import { Header } from '@/2_widgets/Header'

function App() {
    return (
        <div className={cls.app}>
            <Header />
            <div className={cls.pageContainer}>
                <RouterProvider />
            </div>
        </div>
    )
}

export default App
