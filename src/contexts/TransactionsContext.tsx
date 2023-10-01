import { useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'

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

  // Fetch transactions from LocalStorage and filter by query
  async function fetchTransactions(query?: string) {
    const stateJSON = localStorage.getItem('@money-tracker:transactions-1.0')
    let state = stateJSON ? JSON.parse(stateJSON) : []
    if (query) {
      const queryRegex = new RegExp(query, 'i')
      state = state.filter((transaction: Transaction) => {
        return (
          transaction.description.match(queryRegex) ||
          transaction.category.match(queryRegex)
        )
      })
    }

    setTransactions(state)
  }

  // Create new transaction
  async function createTransaction(data: CreateTransactionData) {
    const { description, price, category, type } = data
    const newTransaction = {
      id: Math.random(),
      description,
      price,
      category,
      type,
      date: new Date().toISOString(),
    }
    const updatedTransactions = [...transactions, newTransaction]
    setTransactions(updatedTransactions)
    localStorage.setItem(
      '@money-tracker:transactions-1.0',
      JSON.stringify(updatedTransactions),
    )
  }

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
