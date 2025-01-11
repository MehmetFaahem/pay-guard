export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          role: 'admin' | 'user'
          created_at: string
        }
        Insert: {
          id: string
          email: string
          role?: 'admin' | 'user'
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'admin' | 'user'
          created_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          title: string
          amount: number
          status: 'pending' | 'approved' | 'rejected'
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          amount: number
          status?: 'pending' | 'approved' | 'rejected'
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          amount?: number
          status?: 'pending' | 'approved' | 'rejected'
          user_id?: string
          created_at?: string
        }
      }
      documents: {
        Row: {
          id: string
          user_id: string
          file_url: string
          status: 'pending' | 'verified' | 'rejected'
          uploaded_at: string
        }
        Insert: {
          id?: string
          user_id: string
          file_url: string
          status?: 'pending' | 'verified' | 'rejected'
          uploaded_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          file_url?: string
          status?: 'pending' | 'verified' | 'rejected'
          uploaded_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 