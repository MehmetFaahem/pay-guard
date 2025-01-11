'use client'

import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { Document } from '@/types'
import { DocumentCard } from '@/components/documents/DocumentCard'
import { Button } from '@/components/ui/Button'

export default function DocumentsPage() {
  const { user } = useAuth()
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchDocuments()
  }, [])

  async function fetchDocuments() {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setDocuments(data || [])
    } catch (error) {
      console.error('Error fetching documents:', error)
      toast.error('Failed to load documents')
    } finally {
      setLoading(false)
    }
  }

  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || event.target.files.length === 0) {
      return
    }

    try {
      setUploading(true)
      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${user?.id}/${fileName}`

      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // Get public URL
      const { data } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath)

      if (!data?.publicUrl) {
        throw new Error('Failed to get public URL')
      }

      // Create document record
      const { error: dbError } = await supabase.from('documents').insert([
        {
          name: file.name,
          file_path: filePath,
          file_url: data.publicUrl,
          user_id: user?.id,
          status: 'pending',
          type: file.type,
          size: file.size,
        },
      ])

      if (dbError) throw dbError

      toast.success('Document uploaded successfully')
      fetchDocuments()
    } catch (error) {
      console.error('Error uploading document:', error)
      toast.error('Failed to upload document')
    } finally {
      setUploading(false)
      event.target.value = ''
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Documents</h1>
        <div>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept=".pdf,.doc,.docx,image/*"
            onChange={handleFileUpload}
            disabled={uploading}
          />
          <label htmlFor="file-upload">
            <Button
              disabled={uploading}
              className="cursor-pointer"
            >
              {uploading ? 'Uploading...' : 'Upload Document'}
            </Button>
          </label>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary-600 border-l-transparent rounded-full" />
        </div>
      ) : documents.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {documents.map((document) => (
            <DocumentCard
              key={document.id}
              document={document}
              onDelete={async (id) => {
                try {
                  const { error } = await supabase
                    .from('documents')
                    .delete()
                    .eq('id', id)
                  
                  if (error) throw error
                  
                  setDocuments(docs => docs.filter(d => d.id !== id))
                  toast.success('Document deleted successfully')
                } catch (error) {
                  console.error('Error deleting document:', error)
                  toast.error('Failed to delete document')
                }
              }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">
            No documents found. Upload your first document to get started.
          </p>
        </div>
      )}
    </div>
  )
} 