import { useParams } from 'react-router-dom'

import { useGetDocument } from '@/3_features/GetDocument'
import { ListReferences } from '@/2_widgets/ListReferences'

import cls from './DocumentPage.module.css'
import { Typography } from 'antd'
import { Loader } from '@/5_shared/ui/Loader/Loader'

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
                        <div className={cls.documentInfo}>
                            <div>
                                <Typography.Title level={5}>
                                    {documentData?.title || 'Document'}
                                </Typography.Title>
                                {documentData?.location && (
                                    <Typography.Link
                                        href={documentData.location}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View PDF
                                    </Typography.Link>
                                )}
                            </div>
                            <Typography.Text>
                                {documentData?.processing_status}
                            </Typography.Text>
                        </div>
                        <ListReferences documentId={id} />
                    </>
                )}
            </div>
        </div>
    )
}
