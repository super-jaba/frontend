import { useParams } from 'react-router-dom'

import { useGetDocument } from '@/3_features/GetDocument'
import { ListReferences } from '@/2_widgets/ListReferences'
import { useExtractReferences } from '@/4_entities/Documents'

import cls from './DocumentPage.module.css'
import { Typography, Tag, Tooltip, Button, message } from 'antd'
import { Loader } from '@/5_shared/ui/Loader/Loader'
import { formatDate } from '@/5_shared/lib/utls/formatDate'
import { getStatusColor } from '@/5_shared/lib/utls/getStatusColor'
import {
    FileTextOutlined,
    ClockCircleOutlined,
    EditOutlined,
    ReloadOutlined,
    WarningOutlined,
} from '@ant-design/icons'

export const DocumentPage = () => {
    const { id } = useParams()

    if (!id) {
        return <div>Document ID not found</div>
    }

    const { data: documentData, isLoading: isLoadingDocument } =
        useGetDocument(id)

    const [extractReferences, { isLoading: isExtracting }] =
        useExtractReferences()

    const handleExtractReferences = async () => {
        if (!id) return

        try {
            await extractReferences(id).unwrap()
            message.success('References extraction started successfully')
        } catch (error) {
            message.error('Failed to start references extraction')
        }
    }

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
                                        {documentData?.title ||
                                            'Untitled Document'}
                                    </Typography.Title>
                                </div>
                                <div className={cls.statusActions}>
                                    <Tag
                                        color={getStatusColor(
                                            documentData?.processing_status ||
                                                null,
                                        )}
                                        className={cls.statusTag}
                                    >
                                        {documentData?.processing_status?.toUpperCase() ||
                                            'UNKNOWN'}
                                    </Tag>
                                    {documentData?.processing_status !==
                                        'queued' && (
                                        <Tooltip title="Extract references. This will delete all the existing references">
                                            <Button
                                                type="text"
                                                icon={<ReloadOutlined />}
                                                onClick={
                                                    handleExtractReferences
                                                }
                                                loading={isExtracting}
                                            />
                                        </Tooltip>
                                    )}
                                </div>
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
                                            <WarningOutlined />{' '}
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
