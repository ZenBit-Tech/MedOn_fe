import { Select } from 'antd';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: ${({ theme }) => theme.fontFamily.sf_pro_text};
  > button {
    border: 1px solid ${({ theme }) => theme.colors.blue_500};
    padding: 1rem 0;
  }
  > h4 {
    margin: 0;
    padding: 0;
  }
  > span {
    display: flex;
    padding: 2rem 0;
    justify-content: center;
    font-weight: 500;
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
`;

export const Wrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const StyledSelect = styled(Select)`
  width: 300px;
`;

export const Info = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const Overview = styled.div`
  > button {
    background-color: transparent;
    border: transparent;
    text-align: left;
    margin-top: -1rem;
    padding: 0;
    color: ${({ theme }) => theme.colors.blue_500};
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    cursor: pointer;
  }
  > p {
    margin: 0;
  }
`;

export const Calendar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 300px;
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  > a:last-child {
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.blue_300};
    text-decoration: none;
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    gap: 0.5rem;
  }
`;