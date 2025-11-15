import { Button, Typography, Drawer } from 'antd'
import { FileTextOutlined, LoginOutlined, MenuOutlined } from '@ant-design/icons'
import { Link } from 'react-router'
import { useState } from 'react'

import { RoutePath } from '@/5_shared/config/routerConfig.tsx'
import { useAuth } from '@/5_shared/lib/hooks/useAuth'
import LogoutButton from '@/5_shared/ui/LogoutButton/LogoutButton'

import cls from './Header.module.css'

export const Header = () => {
    const { isAuthenticated } = useAuth()
    const [drawerOpen, setDrawerOpen] = useState(false)

    const showDrawer = () => {
        setDrawerOpen(true)
    }

    const closeDrawer = () => {
        setDrawerOpen(false)
    }

    return (
        <div className={cls.header}>
            <nav className={cls.nav}>
                {/* Desktop Navigation */}
                <div className={cls.leftLinks}>
                    <Link
                        className={cls.link}
                        to={{
                            pathname: RoutePath.documents,
                        }}
                    >
                        <FileTextOutlined className={cls.icon} />
                        <Typography.Text className={cls.linkText}>Documents</Typography.Text>
                    </Link>
                </div>

                {/* Desktop Auth Button */}
                <div className={cls.rightAuth}>
                    {isAuthenticated ? (
                        <LogoutButton />
                    ) : (
                        <Link
                            to={{
                                pathname: RoutePath.login,
                            }}
                        >
                            <Button type="primary" icon={<LoginOutlined />}>
                                Login
                            </Button>
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <Button
                    className={cls.mobileMenuBtn}
                    type="text"
                    icon={<MenuOutlined />}
                    onClick={showDrawer}
                />
            </nav>

            {/* Mobile Drawer */}
            <Drawer
                title="Menu"
                placement="right"
                onClose={closeDrawer}
                open={drawerOpen}
                width={250}
            >
                <div className={cls.drawerContent}>
                    <Link
                        className={cls.drawerLink}
                        to={{
                            pathname: RoutePath.documents,
                        }}
                        onClick={closeDrawer}
                    >
                        <FileTextOutlined className={cls.icon} />
                        <Typography.Text>Documents</Typography.Text>
                    </Link>

                    <div className={cls.drawerAuth}>
                        {isAuthenticated ? (
                            <LogoutButton />
                        ) : (
                            <Link
                                to={{
                                    pathname: RoutePath.login,
                                }}
                                onClick={closeDrawer}
                            >
                                <Button type="primary" icon={<LoginOutlined />} block>
                                    Login
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </Drawer>
        </div>
    )
}
