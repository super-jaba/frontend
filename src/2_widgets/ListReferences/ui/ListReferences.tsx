import { Typography } from 'antd'

import {
    ReferenceCard,
    useListReferences,
    type Reference,
} from '@/4_entities/References'
import { useInfiniteScroll } from '@/5_shared/lib/hooks/useInfiniteScroll'
import { InfiniteList } from '@/5_shared/ui/InfiniteList'
import cls from './ListReferences.module.css'

const { Title } = Typography

interface Props {
    documentId?: string | null
    hideTitle?: boolean
    actions?: React.ReactNode
}

export const ListReferences = (props?: Props) => {
    const { documentId, hideTitle, actions } = props || {}

    const infiniteScroll = useInfiniteScroll<Reference>({
        queryFn: useListReferences,
        queryArgs: documentId ? { document_id: documentId } : {},
        limit: 20,
        extractData: (result) => result,
    })

    return (
        <div className={cls.listReferencesContainer}>
            {!hideTitle && <Title level={5}>References</Title>}
            {actions && <div className={cls.actions}>{actions}</div>}
            <InfiniteList
                data={infiniteScroll.data}
                renderItem={(reference) => (
                    <ReferenceCard reference={reference} />
                )}
                isLoading={infiniteScroll.isLoading}
                isFetchingMore={infiniteScroll.isFetchingMore}
                hasMore={infiniteScroll.hasMore}
                observerRef={infiniteScroll.observerRef}
                keyExtractor={(reference) => reference.id}
                emptyMessage="No references found"
                className={cls.listReferences}
            />
        </div>
    )
}
