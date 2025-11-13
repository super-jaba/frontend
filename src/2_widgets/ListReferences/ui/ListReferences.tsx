import { Row, Col, Typography } from 'antd'

import { ReferenceCard, useListReferences } from '@/4_entities/References'
import { Loader } from '@/5_shared/ui/Loader/Loader'
import cls from './ListReferences.module.css'

const { Title } = Typography

interface Props {
    documentId?: string | null
}

export const ListReferences = (props?: Props) => {
    const { documentId } = props || {}
    const { data: referencesList, isLoading } = useListReferences(
        documentId ? { document_id: documentId } : undefined
    )

    return (
        <div>
            <Title level={5}>References</Title>
            {isLoading && <Loader size="large" />}
            <div className={cls.listReferences}>
                {referencesList && (
                    <Row gutter={[8, 8]} align="stretch">
                        {referencesList.map((reference) => (
                            <Col key={reference.id} span={8} style={{ display: 'flex' }}>
                                <ReferenceCard reference={reference} />
                            </Col>
                        ))}
                    </Row>
                )}
            </div>
        </div>
    )
}

