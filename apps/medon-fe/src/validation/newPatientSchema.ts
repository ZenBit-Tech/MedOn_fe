import * as yup from 'yup';
import { isValidPhoneNumber } from 'react-phone-number-input';

export const newPatientSchema = yup.object({
  firstName: yup
    .string()
    .label('First Name')
    .min(3)
    .max(20)
    .matches(/^[a-zA-Z]+$/, { message: 'Only letters are required' })
    .required(),

  lastName: yup
    .string()
    .label('Last Name')
    .min(3)
    .max(20)
    .matches(/^[a-zA-Z]+$/, { message: 'Only letters are required' })
    .required(),

  email: yup.string().label('Email').email().required(),

  dateOfBirth: yup.string().label('Date of birth').required(),

  address: yup.string().label('Address').required(),

  phoneNumber: yup
    .string()
    .label('Phone number')
    .test('phone-number', 'Invalid Phone Number test', (value) =>
      value ? isValidPhoneNumber(value) : false
    ),
});