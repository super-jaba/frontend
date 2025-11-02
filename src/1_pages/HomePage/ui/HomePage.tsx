import { ListDocuments } from '@/2_widgets/ListDocuments'
import { UploadDocumentForm } from '@/2_widgets/UploadDocumentForm'

export const HomePage = () => {
    return (
        <>
            <UploadDocumentForm />
            <ListDocuments />
        </>
    )
}
