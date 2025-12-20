import type { Reference } from '../model/types'
import { Card, Typography } from 'antd'
import cls from './ReferenceCard.module.css'

const { Text } = Typography

interface Props {
    reference: Reference
}

export const ReferenceCard = (props: Props) => {
    const { reference } = props

    return (
        <Card className={cls.referenceCard}>
            {reference.reference_type && (
                <Text type="secondary" className={cls.referenceType}>
                    {reference.reference_type.replace(/_/g, ' ')}
                </Text>
            )}
            <Typography>{reference.original_text}</Typography>
        </Card>
    )
}
