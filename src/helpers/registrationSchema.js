import * as Yup from 'yup';

export const validationSchemaRegister = Yup.object({
  username: Yup.string()
    .min(2, 'Minimum length is 2 characters')
    .max(20, 'Maximum length is 20 characters')
    .required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .max(12, 'Password cannot exceed 12 characters')
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});
