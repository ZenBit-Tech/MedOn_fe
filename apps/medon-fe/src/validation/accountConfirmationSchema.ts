import * as yup from 'yup';

export const emailSchema = yup.object().shape({
  email: yup.string().email('Must be a valid email').required().min(8),
});
