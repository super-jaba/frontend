import { Button } from 'antd'
import { removeAccessToken } from '@/5_shared/lib/global'

export default function LogoutButton() {
    const handleLogout = () => {
        removeAccessToken()
        window.location.href = '/'
    }

    return <Button onClick={handleLogout}>Logout</Button>
}
