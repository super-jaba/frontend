import './styles/App.css'
import { RouterProvider } from './providers/RouterProvider.tsx'
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
