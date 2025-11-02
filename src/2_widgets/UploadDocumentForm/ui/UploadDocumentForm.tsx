import { Button, FormControl, Input } from '@mui/material'

export const UploadDocumentForm = () => {
    return (
        <FormControl>
            <Button>Click or drag PDF file</Button>
            <Input sx={{ display: 'none' }} type="file" />
        </FormControl>
    )
}
