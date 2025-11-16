import { useGetDocumentQuery } from '@/4_entities/Documents'

export const useGetDocument = (id: string) => {
    const { data, isLoading, error, refetch } = useGetDocumentQuery(id)

    return {
        data,
        isLoading,
        error,
        refetch,
    }
}
