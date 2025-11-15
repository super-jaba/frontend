import type { Document as IDocument } from '../model/types'
import { Card, Typography, Flex } from 'antd'
import { useNavigate } from 'react-router-dom'
import { formatDate } from '@/5_shared/lib/utls/formatDate'
import { getStatusColor } from '@/5_shared/lib/utls/getStatusColor'
import { RoutePath } from '@/5_shared/config/routerConfig'
import cls from './DocumentCard.module.css'

const { Link, Text } = Typography

interface Props {
    document: IDocument
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
