export interface CreateDocumentDTO {
  title: string
  file: File
  type: 'id' | 'proof_of_address' | 'other'
}

export interface DocumentFilters {
  status?: 'pending' | 'verified' | 'rejected'
  type?: 'id' | 'proof_of_address' | 'other'
} 