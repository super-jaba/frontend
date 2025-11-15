import { ListDocuments } from '@/2_widgets/ListDocuments'
import { UploadDocumentForm } from '@/2_widgets/UploadDocumentForm'
import cls from './DocumentsPage.module.css'

export const DocumentsPage = () => {
    return (
        <div className={cls.documentsPage}>
            <UploadDocumentForm />
            <ListDocuments />
        </div>
    )
}
