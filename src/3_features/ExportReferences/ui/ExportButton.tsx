import { Button, Tooltip } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import { useExportReferences } from '../lib/useExportReferences'

interface ExportButtonProps {
    documentId?: string | null
    search?: string | null
    referenceType?: string | null
    disabled?: boolean
    onExportStateChange?: (isExporting: boolean) => void
}

export const ExportButton = (props: ExportButtonProps) => {
    const { documentId, search, referenceType, disabled, onExportStateChange } =
        props
    const { exportReferences, isExporting } = useExportReferences()

    const handleExport = async () => {
        onExportStateChange?.(true)
        try {
            await exportReferences({
                documentId,
                search,
                referenceType,
            })
        } catch (error) {
            // Error handled in hook
        } finally {
            onExportStateChange?.(false)
        }
    }

    return (
        <Tooltip title="Export references">
            <Button
                icon={<DownloadOutlined />}
                onClick={handleExport}
                loading={isExporting}
                disabled={disabled || isExporting}
            />
        </Tooltip>
    )
}
