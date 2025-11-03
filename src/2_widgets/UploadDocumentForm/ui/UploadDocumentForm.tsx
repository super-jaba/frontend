import { Button, Spin, Upload } from 'antd'
import { InboxOutlined, LoadingOutlined } from '@ant-design/icons'

import cls from './UploadDocumentForm.module.css'
import { useUpload } from '@/3_features/UploadDocument/lib/useUpload.ts'

const { Dragger } = Upload

export const UploadDocumentForm = () => {
    const { draggerProps, onClick, contextHolder, isLoading } = useUpload()

    return (
        <div className={cls.uploadDocumentForm}>
            <Dragger {...draggerProps}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                    Click or drag file to this area to upload PDF file
                </p>
            </Dragger>
            <Button className={cls.button} onClick={onClick}>
                {isLoading ? (
                    <Spin indicator={<LoadingOutlined spin />} size="small" />
                ) : (
                    'Upload'
                )}
            </Button>
            {contextHolder}
        </div>
    )
}
