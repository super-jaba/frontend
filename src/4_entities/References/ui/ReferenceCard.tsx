import type { Reference } from '../model/types'
import { Card, Typography } from 'antd'
import cls from './ReferenceCard.module.css'

interface Props {
    reference: Reference
}

export const ReferenceCard = (props: Props) => {
    const { reference } = props

    return (
        <Card className={cls.referenceCard}>
            <Typography>{reference.original_text}</Typography>
        </Card>
    )
}

