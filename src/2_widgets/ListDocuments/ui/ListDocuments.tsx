import { Typography } from 'antd'

import { DocumentCard, useListDocuments } from '@/4_entities/Documents'
import type { Document } from '@/4_entities/Documents'
import { useInfiniteScroll } from '@/5_shared/lib/hooks/useInfiniteScroll'
import { InfiniteList } from '@/5_shared/ui/InfiniteList'
import cls from './ListDocuments.module.css'

const { Title } = Typography

export const ListDocuments = () => {
    const infiniteScroll = useInfiniteScroll<Document>({
        queryFn: useListDocuments,
        limit: 20,
        extractData: (result) => result,
    })

    return (
        <div className={cls.listDocumentsContainer}>
            <Title level={5}>My documents</Title>
            <InfiniteList
                data={infiniteScroll.data}
                renderItem={(document) => <DocumentCard document={document} />}
                isLoading={infiniteScroll.isLoading}
                isFetchingMore={infiniteScroll.isFetchingMore}
                hasMore={infiniteScroll.hasMore}
                observerRef={infiniteScroll.observerRef}
                keyExtractor={(document) => document.id}
                emptyMessage="No documents found"
                className={cls.listDocuments}
            />
        </div>
    )
}
