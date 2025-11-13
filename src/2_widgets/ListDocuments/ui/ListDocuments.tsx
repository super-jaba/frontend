import { Row, Col, Typography } from 'antd'

import { Document, useListDocuments } from '@/4_entities/Documents'
import { Loader } from '@/5_shared/ui/Loader/Loader'
import cls from './ListDocuments.module.css'

const { Title } = Typography

export const ListDocuments = () => {
    const { data: documentsList, isLoading } = useListDocuments()

    return (
        <div>
            <Title level={5}>My documents</Title>
            {isLoading && <Loader size="large" />}
            <div className={cls.listDocuments}>
            {documentsList && (
                <Row gutter={[8, 8]}>
                    {documentsList.map((document) => (
                        <Col key={document.id}>
                            <Document document={document} />
                        </Col>
                    ))}
                </Row>
            )}
            </div>
        </div>
    )
}
