import { useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'
import { v4 as uuidv4 } from 'uuid'

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
  deleteTransaction: (id: number) => Promise<void>
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
    let state: Transaction[] = stateJSON ? JSON.parse(stateJSON) : []

    if (query) {
      // Filter transactions by query
      const lowerCaseQuery = query.toLowerCase()
      state = state.filter((transaction) => {
        const descriptionIncludesQuery = transaction.description
          .toLowerCase()
          .includes(lowerCaseQuery)
        const dateIncludesQuery = transaction.date.includes(lowerCaseQuery)
        const categoryIncludesQuery = transaction.category
          .toLowerCase()
          .includes(lowerCaseQuery)
        const typeIncludesQuery = transaction.type.includes(lowerCaseQuery)

        return (
          descriptionIncludesQuery ||
          dateIncludesQuery ||
          categoryIncludesQuery ||
          typeIncludesQuery
        )
      })
    }

    setTransactions(state)
  }

  // Create new transaction
  async function createTransaction(data: CreateTransactionData) {
    const { description, price, category, type } = data
    const newTransaction = {
      id: parseInt(uuidv4()),
      description,
      price,
      category,
      type,
      date: new Date().toISOString(),
    }
    const updatedTransactions = [newTransaction, ...transactions]
    setTransactions(updatedTransactions)
    localStorage.setItem(
      '@money-tracker:transactions-1.0',
      JSON.stringify(updatedTransactions),
    )
  }

  // Delete transaction
  async function deleteTransaction(id: number) {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id,
    )
    setTransactions(updatedTransactions)
    localStorage.setItem(
      '@money-tracker:transactions-1.0',
      JSON.stringify(updatedTransactions),
    )
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
