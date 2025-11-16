import { ReactNode } from 'react'
import { Loader } from '../Loader/Loader'
import cls from './InfiniteList.module.css'

interface InfiniteListProps<T> {
    data: T[]
    renderItem: (item: T) => ReactNode
    isLoading: boolean
    isFetchingMore: boolean
    hasMore: boolean
    observerRef: (node: HTMLElement | null) => void
    keyExtractor: (item: T) => string
    emptyMessage?: string
    className?: string
    itemClassName?: string
}

export function InfiniteList<T>({
    data,
    renderItem,
    isLoading,
    isFetchingMore,
    hasMore,
    observerRef,
    keyExtractor,
    emptyMessage = 'No items found',
    className,
    itemClassName,
}: InfiniteListProps<T>) {
    if (isLoading) {
        return (
            <div className={cls.loaderContainer}>
                <Loader size="large" />
            </div>
        )
    }

    if (data.length === 0) {
        return <div className={cls.emptyMessage}>{emptyMessage}</div>
    }

    return (
        <div className={className}>
            {data.map((item) => (
                <div key={keyExtractor(item)} className={itemClassName}>
                    {renderItem(item)}
                </div>
            ))}

            {/* Sentinel element for intersection observer */}
            {hasMore && (
                <div ref={observerRef} className={cls.sentinel}>
                    {isFetchingMore && (
                        <div className={cls.loadingMore}>
                            <Loader size="default" />
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
