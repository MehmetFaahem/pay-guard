import { Document } from '@/types'
import { Button } from '@/components/ui/Button'

interface DocumentCardProps {
  document: Document
  onDelete?: (id: string) => void
}

export function DocumentCard({ document, onDelete }: DocumentCardProps) {
  return (
    <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold truncate max-w-[200px]">
            {document.file_url.split('/').pop()}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Uploaded on {new Date(document.uploaded_at).toLocaleDateString()}
          </p>
        </div>
        <span className={`
          px-2.5 py-0.5 rounded-full text-xs font-medium
          ${document.status === 'verified' && 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'}
          ${document.status === 'pending' && 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'}
          ${document.status === 'rejected' && 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}
        `}>
          {document.status}
        </span>
      </div>
      
      <div className="flex gap-2">
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => window.open(document.file_url, '_blank')}
        >
          View
        </Button>
        {onDelete && (
          <Button
            variant="secondary"
            className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400"
            onClick={() => onDelete(document.id)}
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  )
} 