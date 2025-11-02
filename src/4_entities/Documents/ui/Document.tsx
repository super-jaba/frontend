import type { Document as IDocument } from '../model/types'
import { Button, Card, Typography } from 'antd'

interface Props {
    document: IDocument
}

export const Document = (props: Props) => {
    const { document } = props

    return (
        <Card>
            <Typography>{document.title || 'Document'}</Typography>
            <Typography>{document.created_at}</Typography>
            <Typography>{document.processing_status}</Typography>
            <Button>View PDF</Button>
        </Card>
    )
}
