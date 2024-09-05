import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import s from './RegistrationForm.module.css';
import { useDispatch } from 'react-redux';
import { registerThunk } from '../../redux/auth/operations';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const onSubmit = ({ email, name, password }, { resetForm }) => {
    console.log({ email, name, password });

    dispatch(registerThunk({ email, name, password }));
    resetForm();
  };

  return (
    <Formik
      initialValues={{
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={Yup.object({
        name: Yup.string()
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
      })}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <p>Money Guard</p>
          <div>
            <Field type="text" name="name" placeholder="Name" />
            <ErrorMessage name="name" component="div" />
          </div>
          <div>
            <Field type="email" name="email" placeholder="E-mail" />
            <ErrorMessage name="email" component="div" />
          </div>

          <div>
            <Field type="password" name="password" placeholder="Password" />
            <ErrorMessage name="password" component="div" />
          </div>
          <div>
            <Field
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
            />
            <ErrorMessage name="confirmPassword" component="div" />
          </div>
          <button disabled={isSubmitting} type="submit">
            Register
          </button>
          <Link to="/login">
            <button type="button">Login</button>
          </Link>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
