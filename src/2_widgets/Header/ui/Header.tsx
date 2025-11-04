import { Button, Typography } from 'antd'
import { Link } from 'react-router'

import { RoutePath } from '@/5_shared/config/routerConfig.tsx'
import { useAuth } from '@/5_shared/lib/hooks/useAuth'
import LogoutButton from '@/5_shared/ui/LogoutButton/LogoutButton'

import cls from './Header.module.css'

export const Header = () => {
    const { isAuthenticated } = useAuth()

    return (
        <div className={cls.header}>
            <nav className={cls.nav}>
                <Link
                    className={cls.link}
                    to={{
                        pathname: RoutePath.home,
                    }}
                >
                    <Typography>Documents</Typography>
                </Link>

                {isAuthenticated ? (
                    <LogoutButton />
                ) : (
                    <Link
                        className={cls.link}
                        to={{
                            pathname: RoutePath.login,
                        }}
                    >
                        <Button>Login</Button>
                    </Link>
                )}
            </nav>
        </div>
    )
}
