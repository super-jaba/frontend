import { Row, Col, Typography } from 'antd'

import { Document, useListDocuments } from '@/4_entities/Documents'
import { Loader } from '@/5_shared/ui/Loader/Loader.tsx'

const { Title } = Typography;


export const ListDocuments = () => {
    const { data: documentsList, isLoading } = useListDocuments()

    // return (
    //     <div className={cls.listDocuments}>
    //         {isLoading && <Loader size="large" />}
    //         {listDocuments &&
    //             listDocuments.map((doc) => {
    //                 return <Document key={doc.id} document={doc} />
    //             })}
    //     </div>
    // )

    return (
        <div>
            <Title level={5}>My documents</Title>
            {isLoading && <Loader size="large" />}
            <Row gutter={[8, 8]}>
                {documentsList?.map((document) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={document.id}>
                        <Document document={document} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}
