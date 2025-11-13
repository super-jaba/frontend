import type { Document as IDocument } from '../model/types'
import { Card, Typography, Flex } from 'antd'
import { useNavigate } from 'react-router-dom'
import { formatDate } from '@/5_shared/lib/utls/formatDate'
import { RoutePath } from '@/5_shared/config/routerConfig'
import cls from './DocumentCard.module.css'

const { Link, Text } = Typography

interface Props {
    document: IDocument
}

const getStatusColor = (status: string | null): string => {
    switch (status) {
        case 'failed':
            return '#ff4d4f' // red
        case 'queued':
            return '#faad14' // orange/yellow
        case 'ready':
            return '#52c41a' // green
        default:
            return '#8c8c8c' // secondary gray
    }
}

export const DocumentCard = (props: Props) => {
    const { document } = props
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(RoutePath.document.replace(':id', document.id))
    }

    return (
        <Card className={cls.documentCard} onClick={handleClick}>
            <Typography>{document.title || 'Document'}</Typography>
            <Typography>{formatDate(document.created_at)}</Typography>
            <Flex justify="space-between" align="center">
                <Text
                    strong
                    style={{
                        textTransform: 'uppercase',
                        color: getStatusColor(document.processing_status),
                    }}
                >
                    {document.processing_status}
                </Text>
                <Link
                    target="_blank"
                    href={document.location || ''}
                    onClick={(e) => e.stopPropagation()}
                >
                    View PDF
                </Link>
            </Flex>
        </Card>
    )
}
