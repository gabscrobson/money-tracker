import { styled } from 'styled-components'

export const HeaderContainer = styled.header`
  background: ${(props) => props.theme['gray-900']};
  padding: 2.5rem 0 7.5rem;
`

export const HeaderContent = styled.div`
  width: 90%;
  max-width: 1120px;
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  align-items: center;

  > div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  @media (max-width: 500px) {
    flex-direction: column;

    > div {
      margin-bottom: 1rem;
    }
  }
`

export const NewTransactionButton = styled.button`
  height: 50px;
  border: 0;
  background: ${(props) => props.theme['main-700']};
  color: ${(props) => props.theme.white};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: ${(props) => props.theme['main-500']};
  }
`
