import cls from './LoginPage.module.css'
import { AuthForm } from '@/2_widgets/AuthForm'

export const LoginPage = () => {
    return (
        <div className={cls.loginPage}>
            <AuthForm />
        </div>
    )
}
