import type { Document as IDocument } from '../model/types'
import { Card, Typography, Flex, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import { MoreOutlined, DeleteOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { formatDate } from '@/5_shared/lib/utls/formatDate'
import { getStatusColor } from '@/5_shared/lib/utls/getStatusColor'
import { RoutePath } from '@/5_shared/config/routerConfig'
import { useDeleteDocument } from '../api/documentsApi'
import cls from './DocumentCard.module.css'

const { Link: AntLink, Text } = Typography

interface Props {
    document: IDocument
}

export const DocumentCard = (props: Props) => {
    const { document } = props
    const [deleteDocument] = useDeleteDocument()

    const handleDelete = () => {
        deleteDocument(document.id)
    }

    const menuItems: MenuProps['items'] = [
        {
            key: 'delete',
            label: 'Delete',
            icon: <DeleteOutlined />,
            danger: true,
            onClick: ({ domEvent }) => {
                domEvent.stopPropagation()
                handleDelete()
            },
        },
    ]

    const documentPath = RoutePath.document.replace(':id', document.id)

    return (
        <Link to={documentPath} className={cls.cardLink}>
            <Card className={cls.documentCard}>
                <Dropdown
                    menu={{ items: menuItems }}
                    trigger={['click']}
                    placement="bottomRight"
                >
                    <MoreOutlined
                        className={cls.moreIcon}
                        onClick={(e) => e.stopPropagation()}
                    />
                </Dropdown>
                <Text strong>{document.title || 'Document'}</Text>
                <Text type="secondary">{formatDate(document.created_at)}</Text>
                <Flex justify="space-between" align="center" className={cls.footer}>
                    <Text
                        strong
                        style={{
                            textTransform: 'uppercase',
                            color: getStatusColor(document.processing_status),
                        }}
                    >
                        {document.processing_status}
                    </Text>
                    <AntLink
                        target="_blank"
                        href={document.location || ''}
                        onClick={(e) => e.stopPropagation()}
                    >
                        View PDF
                    </AntLink>
                </Flex>
            </Card>
        </Link>
    )
}
