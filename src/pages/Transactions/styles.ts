import { styled } from 'styled-components'

export const TransactionsContainer = styled.div`
  width: 90%;
  max-width: 1120px;
  margin: 4rem auto 3rem;
`

export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;

  td {
    padding: 1.25rem 2rem;
    background: ${(props) => props.theme['gray-700']};
    text-align: right;

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
      text-align: left;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }

    > button {
      background: transparent;
      border: 0;
      transition: 0.2s;
      cursor: pointer;
      color: ${(props) => props.theme['gray-300']};

      &:hover {
        color: ${(props) => props.theme['red-300']};
      }
    }
  }
`

interface PriceHighlightProps {
  variant: 'income' | 'outcome'
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${(props) =>
    props.variant === 'income'
      ? props.theme['green-300']
      : props.theme['red-300']};
`
