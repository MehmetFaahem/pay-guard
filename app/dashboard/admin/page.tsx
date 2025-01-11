'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { User, Payment, Document } from '@/types'
import { AdminStats } from '@/components/admin/AdminStats'
import { UsersList } from '@/components/admin/UsersList'
import { PaymentCard } from '@/components/payments/PaymentCard'
import { DocumentCard } from '@/components/documents/DocumentCard'

export default function AdminPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<User[]>([])
  const [pendingPayments, setPendingPayments] = useState<Payment[]>([])
  const [pendingDocuments, setPendingDocuments] = useState<Document[]>([])

  useEffect(() => {
    // if (user?.role !== 'admin') {
    //   router.push('/dashboard')
    //   return
    // }

    fetchAdminData()
  }, [user, router])

  async function fetchAdminData() {
    try {
      const [
        { data: usersData },
        { data: paymentsData },
        { data: documentsData },
      ] = await Promise.all([
        supabase.from('users').select('*'),
        supabase.from('payments').select('*').eq('status', 'pending'),
        supabase.from('documents').select('*').eq('status', 'pending'),
      ])

      setUsers(usersData || [])
      setPendingPayments(paymentsData || [])
      setPendingDocuments(documentsData || [])
    } catch (error) {
      console.error('Error fetching admin data:', error)
      toast.error('Failed to load admin data')
    } finally {
      setLoading(false)
    }
  }

  async function handlePaymentAction(paymentId: string, status: 'approved' | 'rejected') {
    try {
      const { error } = await supabase
        .from('payments')
        .update({ status })
        .eq('id', paymentId)

      if (error) throw error

      setPendingPayments(payments => 
        payments.filter(payment => payment.id !== paymentId)
      )
      toast.success(`Payment ${status} successfully`)
    } catch (error) {
      console.error('Error updating payment:', error)
      toast.error('Failed to update payment')
    }
  }

  async function handleDocumentAction(documentId: string, status: 'verified' | 'rejected') {
    try {
      const { error } = await supabase
        .from('documents')
        .update({ status })
        .eq('id', documentId)

      if (error) throw error

      setPendingDocuments(documents => 
        documents.filter(doc => doc.id !== documentId)
      )
      toast.success(`Document ${status} successfully`)
    } catch (error) {
      console.error('Error updating document:', error)
      toast.error('Failed to update document')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary-600 border-l-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <AdminStats
        totalUsers={users.length}
        pendingPayments={pendingPayments.length}
        pendingDocuments={pendingDocuments.length}
      />

      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Recent Users</h2>
        <UsersList users={users.slice(0, 5)} />
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Pending Payments</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pendingPayments.map((payment) => (
            <div key={payment.id} className="space-y-4">
              <PaymentCard payment={payment} />
              <div className="flex gap-2">
                <button
                  onClick={() => handlePaymentAction(payment.id, 'approved')}
                  className="btn btn-primary flex-1"
                >
                  Approve
                </button>
                <button
                  onClick={() => handlePaymentAction(payment.id, 'rejected')}
                  className="btn btn-secondary text-red-600 flex-1"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Pending Documents</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pendingDocuments.map((document) => (
            <div key={document.id} className="space-y-4">
              <DocumentCard document={document} />
              <div className="flex gap-2">
                <button
                  onClick={() => handleDocumentAction(document.id, 'verified')}
                  className="btn btn-primary flex-1"
                >
                  Verify
                </button>
                <button
                  onClick={() => handleDocumentAction(document.id, 'rejected')}
                  className="btn btn-secondary text-red-600 flex-1"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 