import { useState, useCallback, useEffect, useRef } from 'react'

interface UseInfiniteScrollParams<TData> {
    queryFn: (params: { skip: number; limit: number }) => any
    queryArgs?: Record<string, any>
    limit?: number
    extractData: (result: any) => TData[] | undefined
    enabled?: boolean
}

interface UseInfiniteScrollResult<TData> {
    data: TData[]
    isLoading: boolean
    isFetchingMore: boolean
    hasMore: boolean
    loadMore: () => void
    observerRef: (node: HTMLElement | null) => void
    refetch: () => void
}

export function useInfiniteScroll<TData>({
    queryFn,
    queryArgs = {},
    limit = 20,
    extractData,
    enabled = true,
}: UseInfiniteScrollParams<TData>): UseInfiniteScrollResult<TData> {
    const [skip, setSkip] = useState(0)
    const [allData, setAllData] = useState<TData[]>([])
    const [hasMore, setHasMore] = useState(true)
    const observerRef = useRef<IntersectionObserver | null>(null)
    const loadingRef = useRef(false)
    const prevQueryArgsRef = useRef<string>(JSON.stringify(queryArgs))

    // Detect queryArgs change synchronously during render
    const queryArgsKey = JSON.stringify(queryArgs)
    const queryArgsChanged = prevQueryArgsRef.current !== queryArgsKey

    // Compute effective skip synchronously - use 0 if args changed
    const effectiveSkip = queryArgsChanged ? 0 : skip

    // Call the query with current pagination params (uses effectiveSkip to avoid stale query)
    const queryResult = queryFn({
        ...queryArgs,
        skip: effectiveSkip,
        limit,
    })

    // Update state after render when queryArgs change
    useEffect(() => {
        if (queryArgsChanged) {
            prevQueryArgsRef.current = queryArgsKey
            setSkip(0)
            setAllData([])
            setHasMore(true)
            loadingRef.current = false
        }
    }, [queryArgsKey, queryArgsChanged])

    const { data: currentData, isLoading, isFetching } = queryResult

    // Track if this is the first load or loading more
    const isFetchingMore = isFetching && effectiveSkip > 0

    // Update data when new results come in
    useEffect(() => {
        if (!isLoading && currentData && enabled) {
            const newItems = extractData(currentData) || []

            if (effectiveSkip === 0) {
                // First load or refresh
                setAllData(newItems)
                setHasMore(newItems.length >= limit)
            } else {
                // Loading more
                setAllData((prev) => {
                    // Avoid duplicates by filtering out items that already exist
                    const existingIds = new Set(
                        prev.map((item: any) => item.id),
                    )
                    const uniqueNewItems = newItems.filter(
                        (item: any) => !existingIds.has(item.id),
                    )
                    return [...prev, ...uniqueNewItems]
                })
                setHasMore(newItems.length >= limit)
            }
            loadingRef.current = false
        }
    }, [currentData, isLoading, effectiveSkip, limit, enabled])

    const loadMore = useCallback(() => {
        if (!loadingRef.current && hasMore && !isLoading && enabled) {
            loadingRef.current = true
            setSkip((prev) => prev + limit)
        }
    }, [hasMore, isLoading, limit, enabled])

    const refetch = useCallback(() => {
        setSkip(0)
        setAllData([])
        setHasMore(true)
        loadingRef.current = false
    }, [])

    // Intersection Observer callback
    const observerCallback = useCallback(
        (node: HTMLElement | null) => {
            if (isLoading || isFetching) return

            if (observerRef.current) {
                observerRef.current.disconnect()
            }

            observerRef.current = new IntersectionObserver((entries) => {
                if (
                    entries[0].isIntersecting &&
                    hasMore &&
                    !loadingRef.current
                ) {
                    loadMore()
                }
            })

            if (node) {
                observerRef.current.observe(node)
            }
        },
        [isLoading, isFetching, hasMore, loadMore],
    )

    // Cleanup observer on unmount
    useEffect(() => {
        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect()
            }
        }
    }, [])

    return {
        data: queryArgsChanged ? [] : allData,
        isLoading: (isLoading || isFetching) && effectiveSkip === 0,
        isFetchingMore,
        hasMore,
        loadMore,
        observerRef: observerCallback,
        refetch,
    }
}
