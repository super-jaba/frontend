import { Document, useListDocuments } from '@/4_entities/Documents'

export const ListDocuments = () => {
    const { data: listDocuments } = useListDocuments()

    return (
        <div>
            {listDocuments?.map((doc) => {
                return <Document key={doc.id} document={doc} />
            })}
        </div>
    )
}
