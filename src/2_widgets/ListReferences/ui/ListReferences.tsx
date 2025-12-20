import { useState } from 'react'
import { Typography, Input, Button, message, Select } from 'antd'
import { PlusOutlined, ClearOutlined } from '@ant-design/icons'

import {
    ReferenceCard,
    useListReferences,
    useGetReferencesTypes,
    useCreateReference,
    type Reference,
} from '@/4_entities/References'
import { useInfiniteScroll } from '@/5_shared/lib/hooks/useInfiniteScroll'
import { InfiniteList } from '@/5_shared/ui/InfiniteList'
import cls from './ListReferences.module.css'

const { Title } = Typography

interface Props {
    documentId?: string | null
    hideTitle?: boolean
}

export const ListReferences = (props?: Props) => {
    const { documentId, hideTitle } = props || {}
    const [searchText, setSearchText] = useState('')
    const [selectedType, setSelectedType] = useState<string | undefined>()

    const { data: types, isLoading: isTypesLoading } = useGetReferencesTypes()
    const [createReference, { isLoading: isCreating }] = useCreateReference()

    const infiniteScroll = useInfiniteScroll<Reference>({
        queryFn: useListReferences,
        queryArgs: {
            ...(documentId ? { document_id: documentId } : {}),
            ...(searchText.trim() ? { search: searchText.trim() } : {}),
            ...(selectedType ? { reference_type: selectedType } : {}),
        },
        limit: 20,
        extractData: (result) => result,
    })

    const handleCreate = async () => {
        if (!searchText.trim()) {
            message.warning('Please enter reference text')
            return
        }

        try {
            await createReference({
                document_id: documentId,
                original_text: searchText.trim(),
            }).unwrap()

            message.success('Reference created successfully')
            setSearchText('')
        } catch (error) {
            message.error('Failed to create reference')
        }
    }

    const handleClearFilters = () => {
        setSearchText('')
        setSelectedType(undefined)
    }

    return (
        <div className={cls.listReferencesContainer}>
            {!hideTitle && <Title level={5}>References</Title>}
            <div className={cls.createReference}>
                <Input
                    placeholder="Search or add reference..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className={cls.input}
                    disabled={isCreating}
                />
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleCreate}
                    loading={isCreating}
                    disabled={!searchText.trim() || isCreating}
                    className={cls.button}
                >
                    Add
                </Button>
                <Select
                    placeholder="Filter by type"
                    value={selectedType}
                    onChange={setSelectedType}
                    allowClear
                    className={cls.select}
                    loading={isTypesLoading}
                    options={types?.map((type) => ({
                        label: type.replace(/_/g, ' '),
                        value: type,
                    }))}
                />
                <Button
                    icon={<ClearOutlined />}
                    onClick={handleClearFilters}
                    disabled={!searchText.trim() && !selectedType}
                    title="Clear filters"
                />
            </div>
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
