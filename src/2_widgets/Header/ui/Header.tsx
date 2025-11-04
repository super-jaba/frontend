import { Link } from 'react-router'
import { RoutePath } from '@/5_shared/config/routerConfig.tsx'
import cls from './Header.module.css'
import { Typography } from 'antd'

export const Header = () => {
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
                <Link
                    className={cls.link}
                    to={{
                        pathname: RoutePath.login,
                    }}
                >
                    <Typography>Login</Typography>
                </Link>
            </nav>
        </div>
    )
}
