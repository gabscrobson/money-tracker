import { CurrencyCircleDollar } from 'phosphor-react'
import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'
import { defaultTheme } from '../../styles/themes/default'
import * as Dialog from '@radix-ui/react-dialog'
import { NewTransactionModal } from '../NewTransactionModal'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <div>
          <CurrencyCircleDollar size={40} color={defaultTheme['main-500']} />
          <h1>Money Tracker</h1>
        </div>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton type="button">
              New Transaction
            </NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
