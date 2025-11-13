export interface Reference {
    id: string
    document_id: string | null
    original_text: string
    reference_type: string | null
    parsed_json: string | null
    created_at: string
    modified_at: string
}

export interface CreateReferenceDto {
    document_id?: string | null
    original_text: string
}

export interface UpdateReferenceDto {
    document_id?: string | null
    original_text?: string | null
}

export interface ListReferencesResponse {
    references: Reference[]
}

export interface ReferenceError {
    data: {
        detail: string
    }
    status: number
}

