import { Button } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import { removeAccessToken } from '@/5_shared/lib/global'

export default function LogoutButton() {
    const handleLogout = () => {
        removeAccessToken()
        window.location.href = '/'
    }

    return (
        <Button onClick={handleLogout} icon={<LogoutOutlined />}>
            Logout
        </Button>
    )
}
