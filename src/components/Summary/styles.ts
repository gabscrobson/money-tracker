import { css, styled } from 'styled-components'

export const SummaryContainer = styled.section`
  width: 90%;
  max-width: 1120px;
  margin: 0 auto;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  margin-top: -5rem;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`

interface SummaryCardProps {
  variant?: 'negative' | 'neutral' | 'positive'
}

const summaryCardVariants = {
  negative: 'red-300',
  neutral: 'white',
  positive: 'green-300',
}

export const SummaryCard = styled.div<SummaryCardProps>`
  background: ${(props) => props.theme['gray-600']};
  padding: 2rem;
  border-radius: 6px;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${(props) => props.theme['gray-300']};
  }

  strong {
    display: block;
    margin-top: 1rem;
    font-size: 2rem;
    font-weight: 500;
    line-height: 3rem;
  }

  svg {
    color: ${(props) =>
      props.variant && props.theme[summaryCardVariants[props.variant]]};
  }

  ${(props) =>
    props.variant &&
    css`
      color: ${props.theme[summaryCardVariants[props.variant]]};
    `}
`
