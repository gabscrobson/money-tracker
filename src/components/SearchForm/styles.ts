import { styled } from 'styled-components'

export const SearchFormContainer = styled.form`
  display: flex;
  gap: 1rem;

  input {
    flex: 1;
    border-radius: 6px;
    border: 0;
    background: ${(props) => props.theme['gray-900']};
    color: ${(props) => props.theme['gray-300']};
    padding: 1rem;
    transition: 0.2s;

    &:focus {
      outline: none;
      box-shadow: 0 0 0 1.5px ${(props) => props.theme['main-500']};
    }

    &::placeholder {
      color: ${(props) => props.theme['gray-500']};
    }
  }

  button {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    border: 0;
    padding: 1rem;
    background: transparent;
    border: 1px solid ${(props) => props.theme['main-500']};
    color: ${(props) => props.theme['main-500']};
    font-weight: bold;
    border-radius: 6px;
    cursor: pointer;
    transition: 0.2s;

    &:not(:disabled):hover {
      background: ${(props) => props.theme['main-500']};
      border-color: ${(props) => props.theme['main-500']};
      color: ${(props) => props.theme.white};
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`
