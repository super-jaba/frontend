import type { ReactNode } from 'react'
import { ConfigProvider } from 'antd'
import { theme } from '@/5_shared/config/themeConfig.ts'

interface Props {
    children: ReactNode
}
export const ThemeProvider = (props: Props) => {
    const { children } = props

    return <ConfigProvider theme={theme}>{children}</ConfigProvider>
}
