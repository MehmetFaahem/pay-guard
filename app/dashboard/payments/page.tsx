'use client'

import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { Payment } from '@/types'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function PaymentsPage() {
  const { user } = useAuth()
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (user?.id) {
      fetchPayments()
    }
  }, [user?.id])

  async function fetchPayments() {
    try {
      let query = supabase
        .from('payments')
        .select('*')
        .order('created_at', { ascending: false })

      if (user?.role !== 'admin') {
        query = query.eq('user_id', user?.id)
      }

      const { data, error } = await query
      if (error) throw error
      
      setPayments(data || [])
    } catch (error) {
      console.error('Fetch error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to load payments')
    } finally {
      setLoading(false)
    }
  }

  async function handleCreatePayment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!user?.id || submitting) return

    setSubmitting(true)
    const formData = new FormData(event.currentTarget)
    
    try {
      const newPayment = {
        title: formData.get('title') as string,
        amount: parseFloat(formData.get('amount') as string),
        user_id: user.id,
        status: 'pending',
        created_at: new Date().toISOString()
      }

      const { error } = await supabase
        .from('payments')
        .insert([newPayment])

      if (error) throw error

      toast.success('Payment created successfully')
      setShowCreateForm(false)
      fetchPayments()
    } catch (error) {
      console.error('Create error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to create payment')
    } finally {
      setSubmitting(false)
    }
  }

  async function handlePaymentAction(paymentId: string, status: 'approved' | 'rejected') {
    try {
      const { error } = await supabase
        .from('payments')
        .update({ 
          status,
          updated_at: new Date().toISOString() 
        })
        .eq('id', paymentId)

      if (error) throw error

      setPayments(payments => 
        payments.map(payment => 
          payment.id === paymentId 
            ? { ...payment, status } 
            : payment
        )
      )
      
      toast.success(`Payment ${status} successfully`)
    } catch (error) {
      console.error('Update error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to update payment')
    }
  }

  function PaymentCard({ payment }: { payment: Payment }) {
    return (
      <div className="p-6 bg-white rounded-lg shadow">
        <h3 className="font-medium">{payment.title}</h3>
        <p className="text-2xl font-bold">${payment.amount}</p>
        <p className="text-sm text-gray-500 capitalize">Status: {payment.status}</p>
        
        {user?.role === 'admin' && payment.status === 'pending' && (
          <div className="mt-4 flex gap-2">
            <Button
              onClick={() => handlePaymentAction(payment.id, 'approved')}
              className="w-full"
            >
              Approve
            </Button>
            <Button
              variant="secondary"
              onClick={() => handlePaymentAction(payment.id, 'rejected')}
              className="w-full"
            >
              Reject
            </Button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Payments</h1>
        <Button 
          onClick={() => setShowCreateForm(true)}
          disabled={submitting}
        >
          Create Payment
        </Button>
      </div>

      {showCreateForm && (
        <form onSubmit={handleCreatePayment} className="space-y-4 p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
          <Input
            label="Title"
            name="title"
            required
            placeholder="Payment title"
            disabled={submitting}
          />
          <Input
            label="Amount"
            name="amount"
            type="number"
            step="0.01"
            required
            placeholder="0.00"
            disabled={submitting}
          />
          <div className="flex gap-4">
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Creating...' : 'Create'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowCreateForm(false)}
              disabled={submitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary-600 border-l-transparent rounded-full" />
        </div>
      ) : payments.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {payments.map((payment) => (
            <PaymentCard key={payment.id} payment={payment} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            No payments found. Create your first payment to get started.
          </p>
        </div>
      )}
    </div>
  )
} 