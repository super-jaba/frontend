import { ListDocuments } from '@/2_widgets/ListDocuments'
import { UploadDocumentForm } from '@/2_widgets/UploadDocumentForm'
import cls from './HomePage.module.css'
export const HomePage = () => {
    return (
        <div className={cls.homePage}>
            <UploadDocumentForm />
            <ListDocuments />
        </div>
    )
}
