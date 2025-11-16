import { Typography } from 'antd'

import { ReferenceCard, useListReferences } from '@/4_entities/References'
import { Loader } from '@/5_shared/ui/Loader/Loader'
import cls from './ListReferences.module.css'

const { Title } = Typography

interface Props {
    documentId?: string | null
    hideTitle?: boolean
    actions?: React.ReactNode
}

export const ListReferences = (props?: Props) => {
    const { documentId, hideTitle, actions } = props || {}
    const { data: referencesList, isLoading } = useListReferences(
        documentId ? { document_id: documentId } : undefined,
    )

    return (
        <div className={cls.listReferencesContainer}>
            {!hideTitle && <Title level={5}>References</Title>}
            {actions && <div className={cls.actions}>{actions}</div>}
            {isLoading && <Loader size="large" />}
            {referencesList && (
                <div className={cls.listReferences}>
                    {referencesList.map((reference) => (
                        <ReferenceCard
                            key={reference.id}
                            reference={reference}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
