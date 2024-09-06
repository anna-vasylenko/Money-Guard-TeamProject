import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
// import s from './RegistrationForm.module.css';
import { useDispatch } from 'react-redux';
import { registerThunk } from '../../redux/auth/operations';
import { validationSchemaRegister } from '../../helpers/registrationSchema';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const onSubmit = ({ email, username, password }, { resetForm }) => {
    dispatch(registerThunk({ email, username, password }));
    resetForm();
  };

  return (
    <Formik
      initialValues={{
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
      }}
      const
      validationSchema={validationSchemaRegister}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <p>Money Guard</p>
          <div>
            <Field type="text" name="username" placeholder="Name" />
            <ErrorMessage name="username" component="div" />
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
          <Link to="/login">Login</Link>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
