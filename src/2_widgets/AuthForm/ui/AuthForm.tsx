import { GithubOutlined } from '@ant-design/icons'
import { Button, Typography } from 'antd'
import cls from './AuthForm.module.css'
import { useAuthWithGithub } from '@/3_features/Auth'

export const AuthForm = () => {
    const { redirect } = useAuthWithGithub()

    return (
        <div className={cls.loginForm}>
            <Typography.Title level={2}>Sign in</Typography.Title>
            <Button className={cls.button} onClick={redirect}>
                <GithubOutlined className={cls.icon} />
                Login with GitHub
            </Button>
        </div>
    )
}
