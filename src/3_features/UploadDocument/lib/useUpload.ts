import { useUploadDocument } from '@/4_entities/Documents'
import { useState } from 'react'
import { message, type UploadFile } from 'antd'
import type { UploadDocumentError } from '@/4_entities/Documents/model/types.ts'
import { validatePDFFile } from '@/5_shared/lib/utls/validateFile'

// think about how to make hook easier and more readable
export const useUpload = (extractAfter: boolean = false) => {
    const [files, setFiles] = useState<File[]>([])
    const [fileList, setFileList] = useState<UploadFile[]>([])
    const [messageApi, contextHolder] = message.useMessage()
    const [useUploadFile, { isLoading }] = useUploadDocument()

    const beforeUpload = (file: File) => {
        const isValidate = validatePDFFile(file, messageApi)
        if (!isValidate) return false

        setFileList((prev) => [
            ...prev,
            {
                uid: String(Date.now() + Math.random()),
                name: file.name,
            },
        ])
        setFiles((prev) => [...prev, file])
        return false
    }

    const onRemove = (file: UploadFile) => {
        const index = fileList.findIndex((item) => item.uid === file.uid)
        if (index === -1) return

        setFileList((prev) => {
            const next = [...prev]
            next.splice(index, 1)
            return next
        })
        setFiles((prev) => {
            const next = [...prev]
            next.splice(index, 1)
            return next
        })
    }

    const onClick = async () => {
        if (files.length === 0) {
            messageApi.error('Please upload at least one PDF file')
            return false
        }

        try {
            const uploadPromises = files.map((file) =>
                useUploadFile({
                    file,
                    extract_after_upload: extractAfter,
                }).unwrap(),
            )

            await Promise.all(uploadPromises)

            messageApi.success('All files uploaded successfully')
            setFiles([])
            setFileList([])
        } catch (err: any) {
            const error = err as UploadDocumentError
            messageApi.error(error.data?.detail || 'One or more uploads failed')
        }
    }

    const draggerProps = {
        multiple: true,
        beforeUpload,
        onRemove,
        fileList,
    }

    return {
        draggerProps,
        onClick,
        contextHolder,
        isLoading,
        hasFile: files.length > 0,
    }
}
