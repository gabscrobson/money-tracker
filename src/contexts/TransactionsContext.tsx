import { createContext, useEffect, useState } from 'react'
import { api } from '../lib/axios'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  date: string
}

interface CreateTransactionData {
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
}

interface TransactionsContextType {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionData) => Promise<void>
}

interface TransactionsProviderProps {
  children: React.ReactNode
}

export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  // Load transactions on component mount
  useEffect(() => {
    fetchTransactions()
  }, [])

  // Fetch transactions from API
  async function fetchTransactions(query?: string) {
    const response = await api.get('/transactions', {
      params: {
        _sort: 'date',
        _order: 'desc',
        q: query,
      },
    })
    setTransactions(response.data)
  }

  async function createTransaction(data: CreateTransactionData) {
    const { description, price, category, type } = data
    const response = await api.post('/transactions', {
      description,
      price,
      category,
      type,
      date: new Date().toISOString(),
    })
    setTransactions((prev) => [...prev, response.data])
  }

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
