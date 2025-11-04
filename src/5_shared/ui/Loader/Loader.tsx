import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

interface Props {
    size: 'small' | 'default' | 'large'
}

export const Loader = (props: Props) => {
    const { size } = props

    return <Spin indicator={<LoadingOutlined spin />} size={size} />
}
