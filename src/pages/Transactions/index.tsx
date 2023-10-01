import { Header } from '../../components/Header'
import { SearchForm } from '../../components/SearchForm'
import { Summary } from '../../components/Summary'
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { useContextSelector } from 'use-context-selector'
import { Trash } from 'phosphor-react'

export function Transactions() {
  const { transactions, deleteTransaction } = useContextSelector(
    TransactionsContext,
    (context) => {
      return {
        transactions: context.transactions,
        deleteTransaction: context.deleteTransaction,
      }
    },
  )

  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => {
              function handleDeleteTransaction() {
                deleteTransaction(transaction.id)
              }

              return (
                <tr key={transaction.id}>
                  <td>{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      {transaction.type === 'outcome' ? '- ' : ''}
                      {priceFormatter.format(transaction.price)}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>{dateFormatter.format(new Date(transaction.date))}</td>
                  <td>
                    <button onClick={handleDeleteTransaction}>
                      <Trash size={24} />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}
