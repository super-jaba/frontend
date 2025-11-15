import { Typography } from 'antd'

import { DocumentCard, useListDocuments } from '@/4_entities/Documents'
import { Loader } from '@/5_shared/ui/Loader/Loader'
import cls from './ListDocuments.module.css'

const { Title } = Typography

export const ListDocuments = () => {
    const { data: documentsList, isLoading } = useListDocuments()

    return (
        <div className={cls.listDocumentsContainer}>
            <Title level={5}>My documents</Title>
            {isLoading && <Loader size="large" />}
            <div className={cls.listDocuments}>
                {documentsList && documentsList.map((document) => (
                    <DocumentCard key={document.id} document={document} />
                ))}
            </div>
        </div>
    )
}
