import { useUploadDocument } from '@/4_entities/Documents'
import { useState } from 'react'
import { message, type UploadFile } from 'antd'
import type { UploadDocumentError } from '@/4_entities/Documents/model/types.ts'
import { validatePDFFile } from '@/5_shared/lib/utls/validateFile'

// think about how to make hook easier and more readable
export const useUpload = (extractAfter: boolean = false) => {
    const [file, setFile] = useState<File | null>(null)
    const [fileList, setFileList] = useState<UploadFile[]>([])
    const [messageApi, contextHolder] = message.useMessage()
    const [useUploadFile, { isLoading }] = useUploadDocument()

    const beforeUpload = (file: File) => {
        const isValidate = validatePDFFile(file, messageApi)
        if (!isValidate) return false

        setFileList([
            {
                uid: String(Date.now()),
                name: file.name,
            },
        ])
        setFile(file)
        return false
    }

    const onRemove = () => {
        setFile(null)
        setFileList([])
    }

    const onClick = () => {
        if (!file) {
            messageApi.error('Please upload a PDF file')
            return false
        }
        useUploadFile({ file, extract_after_upload: extractAfter })
            .unwrap()
            .then(() => {
                messageApi.success('File uploaded successfully')
                setFile(null)
                setFileList([])
            })
            .catch((err: UploadDocumentError) => {
                messageApi.error(err.data.detail || 'Upload failed')
            })
    }

    const draggerProps = {
        beforeUpload,
        onRemove,
        fileList,
    }

    return {
        draggerProps,
        onClick,
        contextHolder,
        isLoading,
        hasFile: file !== null,
    }
}
