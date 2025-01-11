export interface CreatePaymentDTO {
  title: string
  amount: number
  description?: string
}

export interface PaymentFilters {
  status?: 'pending' | 'approved' | 'rejected'
  startDate?: Date
  endDate?: Date
} 