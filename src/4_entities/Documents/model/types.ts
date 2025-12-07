export interface Document {
    id: string
    title?: string | null
    location: string | null
    processing_status: DocumentProcessStatus | string | null
    extraction_error: string | null
    created_at: string
    modified_at: string
}

type DocumentProcessStatus = 'created' | 'failed' | 'queued' | 'ready'

export interface ListDocumentsResponse {
    documents: Document[]
}

export interface UploadDocumentError {
    data: {
        detail: string
    }
    status: number
}
