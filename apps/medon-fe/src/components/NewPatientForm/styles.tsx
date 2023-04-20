import styled from 'styled-components';
import { Button, DatePicker, Select } from 'antd';

export const Container = styled.div`
  max-width: 400px;
  min-width: 200px;
  width: 40%;
  margin: 40px auto 0px;
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.fontFamily.roboto};
`;

export const Header = styled.h1`
  font-family: ${({ theme }) => theme.fontFamily.roboto};
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: 400;
  margin-bottom: 40px;
  text-align: center;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const InputWrapper = styled.div`
  margin-bottom: 16px;
`;

export const Label = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  display: block;
  margin-bottom: 4px;
`;

export const ErrorMsg = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.red_500};
`;

export const StyledSelect = styled(Select)`
  width: 100%;
`;

export const StyledDatePicker = styled(DatePicker)`
  width: 100%;
`;

export const StyledButton = styled(Button)`
  margin-top: 10px;
`;