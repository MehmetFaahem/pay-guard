import { formatCurrency } from '@/lib/utils'
import { Payment } from '@/types'

interface PaymentCardProps {
  payment: Payment
}

export function PaymentCard({ payment }: PaymentCardProps) {
  return (
    <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{payment.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {formatCurrency(payment.amount)}
          </p>
        </div>
        <span className={`
          px-2.5 py-0.5 rounded-full text-xs font-medium
          ${payment.status === 'approved' && 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'}
          ${payment.status === 'pending' && 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'}
          ${payment.status === 'rejected' && 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}
        `}>
          {payment.status}
        </span>
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Created on {new Date(payment.created_at).toLocaleDateString()}
      </div>
    </div>
  )
} 