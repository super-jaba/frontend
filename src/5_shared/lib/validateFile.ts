import type { MessageInstance } from 'antd/es/message/interface'

export const validatePDFFile = (file: File, messageApi: MessageInstance) => {
    const isPDF = file.type === 'application/pdf'
    if (!isPDF) {
        messageApi.error('You can only upload PDF files')
        return false
    }

    const isLt10M = file.size / 1024 / 1024 < 10
    if (!isLt10M) {
        messageApi.error('File must be smaller than 10MB')
        return false
    }
    return true
}
