import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginThunk } from '../../redux/auth/operations';
import { validationSchemaLogin } from '../../helpers/loginSchema';

const LoginForm = () => {
  const dispatch = useDispatch();
  const onSubmit = ({ email, password }, { resetForm }) => {
    dispatch(loginThunk({ email, password }));
    resetForm();
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      const
      validationSchema={validationSchemaLogin}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <p>Money Guard</p>
          <div>
            <Field type="email" name="email" placeholder="E-mail" />
            <ErrorMessage name="email" component="div" />
          </div>

          <div>
            <Field type="password" name="password" placeholder="Password" />
            <ErrorMessage name="password" component="div" />
          </div>

          <button disabled={isSubmitting} type="submit">
            Login
          </button>
          <Link to="/register">Register</Link>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
