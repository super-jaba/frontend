import { Document, useListDocuments } from '@/4_entities/Documents'
import cls from './ListDocuments.module.css'

export const ListDocuments = () => {
    const { data: listDocuments } = useListDocuments()

    return (
        <div className={cls.listDocuments}>
            {listDocuments?.map((doc) => {
                return <Document key={doc.id} document={doc} />
            })}
        </div>
    )
}
