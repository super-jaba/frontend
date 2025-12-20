import { useState } from 'react'
import { Typography, Input, Button, Select, Tooltip } from 'antd'
import { PlusOutlined, ClearOutlined } from '@ant-design/icons'

import {
    ReferenceCard,
    useListReferences,
    useGetReferencesTypes,
    type Reference,
} from '@/4_entities/References'
import { useInfiniteScroll } from '@/5_shared/lib/hooks/useInfiniteScroll'
import { InfiniteList } from '@/5_shared/ui/InfiniteList'
import { ExportButton } from '@/3_features/ExportReferences'
import { useCreateReferenceAction } from '@/3_features/CreateReference'
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
    const [isExporting, setIsExporting] = useState(false)

    const { data: types, isLoading: isTypesLoading } = useGetReferencesTypes()
    const { create, isLoading: isCreating } = useCreateReferenceAction()

    const isLocked = isCreating || isExporting

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
        const success = await create(documentId, searchText)
        if (success) {
            setSearchText('')
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
                    disabled={isLocked}
                />
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleCreate}
                    loading={isCreating}
                    disabled={!searchText.trim() || isLocked}
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
                    disabled={isLocked}
                    options={types?.map((type) => ({
                        label: type.replace(/_/g, ' '),
                        value: type,
                    }))}
                />
                <ExportButton
                    documentId={documentId}
                    search={searchText}
                    referenceType={selectedType}
                    disabled={isLocked}
                    onExportStateChange={setIsExporting}
                />
                <Tooltip title="Clear filters">
                    <Button
                        icon={<ClearOutlined />}
                        onClick={handleClearFilters}
                        disabled={
                            (!searchText.trim() && !selectedType) || isLocked
                        }
                    />
                </Tooltip>
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
