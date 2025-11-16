import { useState } from 'react'
import { Input, Button, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { useCreateReference } from '@/4_entities/References'
import cls from './CreateReference.module.css'

interface CreateReferenceProps {
    documentId?: string | null
}

export const CreateReference = ({
    documentId = null,
}: CreateReferenceProps) => {
    const [originalText, setOriginalText] = useState('')
    const [createReference, { isLoading }] = useCreateReference()

    const handleCreate = async () => {
        if (!originalText.trim()) {
            message.warning('Please enter reference text')
            return
        }

        try {
            await createReference({
                document_id: documentId,
                original_text: originalText.trim(),
            }).unwrap()

            message.success('Reference created successfully')
            setOriginalText('')
        } catch (error) {
            message.error('Failed to create reference')
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleCreate()
        }
    }

    return (
        <div className={cls.createReference}>
            <Input
                placeholder="Enter reference text..."
                value={originalText}
                onChange={(e) => setOriginalText(e.target.value)}
                onKeyPress={handleKeyPress}
                className={cls.input}
                disabled={isLoading}
            />
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleCreate}
                loading={isLoading}
                disabled={!originalText.trim() || isLoading}
                className={cls.button}
            >
                Add
            </Button>
        </div>
    )
}
