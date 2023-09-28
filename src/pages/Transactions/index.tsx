import { Header } from '../../components/Header'
import { SearchForm } from '../../components/SearchForm'
import { Summary } from '../../components/Summary'
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'

export function Transactions() {
  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            <tr>
              <td width="50%">Desenvolvimento de site</td>
              <td>
                <PriceHighlight variant="income">R$ 12.000</PriceHighlight>
              </td>
              <td>Vendas</td>
              <td>20/02/2021</td>
            </tr>
            <tr>
              <td width="50%">Hamburger</td>
              <td>
                <PriceHighlight variant="outcome">-R$ 59</PriceHighlight>
              </td>
              <td>Alimentação</td>
              <td>21/02/2021</td>
            </tr>
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}
