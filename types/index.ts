export type UserRole = 'admin' | 'user'

export interface User {
  id: string
  email: string
  role: UserRole
  created_at: string
}

export interface Payment {
  id: string
  title: string
  amount: number
  status: 'pending' | 'approved' | 'rejected'
  user_id: string
  created_at: string
}

export interface Document {
  id: string
  user_id: string
  file_url: string
  status: 'pending' | 'verified' | 'rejected'
  uploaded_at: string
} 