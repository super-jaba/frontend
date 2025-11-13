import { useState } from 'react'

import { Button, Upload, Checkbox } from 'antd'
import { InboxOutlined } from '@ant-design/icons'

import cls from './UploadDocumentForm.module.css'
import { useUpload } from '@/3_features/UploadDocument'
import { Loader } from '@/5_shared/ui/Loader/Loader.tsx'

const { Dragger } = Upload

export const UploadDocumentForm = () => {
    const [extractAfter, setExtractAfter] = useState(false)
    const { draggerProps, onClick, contextHolder, isLoading } =
        useUpload(extractAfter)

    return (
        <div className={cls.uploadDocumentForm}>
            <Dragger style={{ backgroundColor: 'white' }} {...draggerProps}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                    Click or drag file to this area to upload PDF file
                </p>
            </Dragger>
            <div className={cls.controlsContainer}>
                <Button className={cls.button} onClick={onClick}>
                    {isLoading ? <Loader size="small" /> : 'Upload'}
                </Button>
                <Checkbox
                    className={cls.checkbox}
                    checked={extractAfter}
                    onChange={() => setExtractAfter(!extractAfter)}
                >
                    Extract after
                </Checkbox>
            </div>
            {contextHolder}
        </div>
    )
}
