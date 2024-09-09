import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginThunk } from '../../redux/auth/operations';
import { validationSchemaLogin } from '../../helpers/loginSchema';
import s from './LoginForm.module.css';
import { Icons } from '../Icons/Icons';

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
      validationSchema={validationSchemaLogin}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={s.form}>
          <div className={s.modalEllipse}></div>
          <div className={s.loginLogo}>
            <Icons
              name={'logo'}
              width={27}
              height={26}
              className={s.iconLogo}
            />
            <p className={s.loginTitle}>Money Guard</p>
          </div>
          <label className={s.label}>
            <div className="inputContainerLogo">
              <Icons
                name={'email'}
                width={20}
                height={16}
                className={s.iconName}
              />
              <Field
                className={s.loginInput}
                type="email"
                name="email"
                placeholder="E-mail"
              />
              <ErrorMessage name="email" component="div" className={s.error} />
            </div>
          </label>
          <label className={s.label}>
            <div className="inputContainerLogo">
              <Icons
                name={'password'}
                width={17}
                height={17}
                className={s.iconName}
              />
              <Field
                className={s.loginInput}
                type="password"
                name="password"
                placeholder="Password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className={s.error}
              />
            </div>
          </label>
          <button className={s.but} disabled={isSubmitting} type="submit">
            Login
          </button>
          <Link className={s.link} to="/register">
            Register
          </Link>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
