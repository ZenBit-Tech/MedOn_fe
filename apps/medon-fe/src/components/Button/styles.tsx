import styled from 'styled-components';
import { ButtonStyleProps } from './ButtonTypes';

export const StyledButton = styled.button<ButtonStyleProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: transparent;
  font-family: ${({ theme }) => theme.fontFamily.roboto};
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ textColor }) => textColor};
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
  gap: 0.75rem;
  width: ${({ isFullWidth }) => (isFullWidth ? '100%' : 'fit-content')};
`;