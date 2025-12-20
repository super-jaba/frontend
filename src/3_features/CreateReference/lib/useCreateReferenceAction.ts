import { message } from 'antd'
import { useCreateReference } from '@/4_entities/References'

export const useCreateReferenceAction = () => {
    const [createReference, { isLoading }] = useCreateReference()

    const create = async (
        documentId: string | null | undefined,
        text: string,
    ) => {
        if (!text.trim()) {
            message.warning('Please enter reference text')
            return false
        }

        try {
            await createReference({
                document_id: documentId,
                original_text: text.trim(),
            }).unwrap()

            message.success('Reference created successfully')
            return true
        } catch (error) {
            message.error('Failed to create reference')
            return false
        }
    }

    return { create, isLoading }
}
