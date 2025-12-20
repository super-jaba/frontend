import { useState } from 'react'
import { message } from 'antd'
import { BASE_URL, getAccessToken } from '@/5_shared/lib/global'

interface ExportParams {
    documentId?: string | null
    search?: string | null
    referenceType?: string | null
}

export const useExportReferences = () => {
    const [isExporting, setIsExporting] = useState(false)

    const exportReferences = async (params: ExportParams) => {
        setIsExporting(true)
        try {
            const queryParams = new URLSearchParams()
            if (params.documentId)
                queryParams.append('document_id', params.documentId)
            if (params.search)
                queryParams.append('search', params.search.trim())
            if (params.referenceType)
                queryParams.append('reference_type', params.referenceType)

            const response = await fetch(
                `${BASE_URL}/exports/references?${queryParams.toString()}`,
                {
                    headers: {
                        Authorization: `Bearer ${getAccessToken()}`,
                        'ngrok-skip-browser-warning': 'true',
                    },
                },
            )

            if (!response.ok) throw new Error('Export failed')

            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            const contentDisposition = response.headers.get(
                'content-disposition',
            )
            let fileName = `references_${new Date().toISOString().split('T')[0]}.json`
            if (contentDisposition) {
                const fileNameMatch =
                    contentDisposition.match(/filename="?(.+)"?/)
                if (fileNameMatch && fileNameMatch[1]) {
                    fileName = fileNameMatch[1]
                }
            }
            a.download = fileName
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
            document.body.removeChild(a)
            message.success('References exported successfully')
        } catch (error) {
            message.error('Failed to export references')
            throw error
        } finally {
            setIsExporting(false)
        }
    }

    return { exportReferences, isExporting }
}
