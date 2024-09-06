import * as Yup from 'yup';

export const validationSchemaLogin = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .max(12, 'Password cannot exceed 12 characters')
    .required('Required'),
});
