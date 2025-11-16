import { ListReferences } from '@/2_widgets/ListReferences'
import { CreateReference } from '@/2_widgets/CreateReference'
import cls from './ReferencesPage.module.css'
import { Typography } from 'antd'

const { Title } = Typography

export const ReferencesPage = () => {
    return (
        <div className={cls.referencesPage}>
            <div className={cls.pageContent}>
                <Title level={2} className={cls.pageTitle}>
                    All References
                </Title>
                <div className={cls.createReferenceWrapper}>
                    <CreateReference documentId={null} />
                </div>
                <ListReferences hideTitle />
            </div>
        </div>
    )
}
