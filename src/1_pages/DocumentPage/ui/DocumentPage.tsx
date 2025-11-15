import { useParams } from 'react-router-dom'

import { useGetDocument } from '@/3_features/GetDocument'
import { ListReferences } from '@/2_widgets/ListReferences'

import cls from './DocumentPage.module.css'
import { Typography, Tag, Tooltip } from 'antd'
import { Loader } from '@/5_shared/ui/Loader/Loader'
import { formatDate } from '@/5_shared/lib/utls/formatDate'
import { getStatusColor } from '@/5_shared/lib/utls/getStatusColor'
import {
    FileTextOutlined,
    ClockCircleOutlined,
    EditOutlined,
} from '@ant-design/icons'

export const DocumentPage = () => {
    const { id } = useParams()

    if (!id) {
        return <div>Document ID not found</div>
    }

    const { data: documentData, isLoading: isLoadingDocument } =
        useGetDocument(id)

    return (
        <div className={cls.documentPage}>
            <div>
                {isLoadingDocument ? (
                    <Loader size="large" />
                ) : (
                    <>
                        <div className={cls.documentHeader}>
                            <div className={cls.headerTop}>
                                <div className={cls.titleSection}>
                                    <FileTextOutlined
                                        className={cls.titleIcon}
                                    />
                                    <Typography.Title
                                        level={2}
                                        className={cls.title}
                                    >
                                        {documentData?.title || 'Untitled Document'}
                                    </Typography.Title>
                                </div>
                                <Tag
                                    color={getStatusColor(
                                        documentData?.processing_status || null
                                    )}
                                    className={cls.statusTag}
                                >
                                    {documentData?.processing_status?.toUpperCase() ||
                                        'UNKNOWN'}
                                </Tag>
                            </div>

                            <div className={cls.metadata}>
                                <Tooltip
                                    title={`Created on ${formatDate(documentData?.created_at || '')}`}
                                >
                                    <ClockCircleOutlined
                                        className={cls.metadataIcon}
                                    />
                                </Tooltip>
                                <Tooltip
                                    title={`Modified on ${formatDate(documentData?.modified_at || '')}`}
                                >
                                    <EditOutlined
                                        className={cls.metadataIcon}
                                    />
                                </Tooltip>
                            </div>

                            {documentData?.location && (
                                <Typography.Link
                                    href={documentData.location}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cls.pdfLink}
                                >
                                    <FileTextOutlined /> View PDF
                                </Typography.Link>
                            )}

                            {documentData?.processing_status === 'failed' &&
                                documentData?.extraction_error && (
                                    <div className={cls.errorMessage}>
                                        <Typography.Text type="danger">
                                            <strong>Error:</strong>{' '}
                                            {documentData.extraction_error}
                                        </Typography.Text>
                                    </div>
                                )}
                        </div>
                        <ListReferences documentId={id} />
                    </>
                )}
            </div>
        </div>
    )
}
