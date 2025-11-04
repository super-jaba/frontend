import { Document, useListDocuments } from '@/4_entities/Documents'
import cls from './ListDocuments.module.css'
import { Loader } from '@/5_shared/ui/Loader/Loader.tsx'

export const ListDocuments = () => {
    const { data: listDocuments, isLoading } = useListDocuments()

    return (
        <div className={cls.listDocuments}>
            {isLoading && <Loader size="large" />}
            {listDocuments &&
                listDocuments.map((doc) => {
                    return <Document key={doc.id} document={doc} />
                })}
        </div>
    )
}
