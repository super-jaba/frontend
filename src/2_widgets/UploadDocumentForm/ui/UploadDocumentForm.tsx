import { Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { useUploadDocument } from '@/4_entities/Documents'
const { Dragger } = Upload

export const UploadDocumentForm = () => {
    const [useUpload] = useUploadDocument()

    const handler = (file: any) => {
        const formData = new FormData()
        formData.append('file', file)
        useUpload(formData)
        return false // do not send request automatically
    }

    return (
        <Dragger beforeUpload={(file) => handler(file)}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">
                Click or drag file to this area to upload
            </p>
        </Dragger>
    )
}
