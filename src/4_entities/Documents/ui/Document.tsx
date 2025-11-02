import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
} from '@mui/material'
import type { Document as IDocument } from '../model/types'

interface Props {
    document: IDocument
}

export const Document = (props: Props) => {
    const { document } = props

    return (
        <Card>
            <CardContent>
                <Typography>{document.title || 'Document'}</Typography>
                <Typography>{document.created_at}</Typography>
                <Typography>{document.processing_status}</Typography>
            </CardContent>
            <CardActions>
                <Button>View PDF</Button>
            </CardActions>
        </Card>
    )
}
