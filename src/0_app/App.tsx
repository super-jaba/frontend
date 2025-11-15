import './styles/App.css'
import { RouterProvider } from './providers/RouterProvider.tsx'
import '@/0_app/App.module.css'
import { Header } from '@/2_widgets/Header'

function App() {
    return (
        <div className="app">
            <Header />
            <RouterProvider />
        </div>
    )
}

export default App
