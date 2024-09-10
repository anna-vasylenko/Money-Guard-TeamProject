import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import s from './RegistrationForm.module.css';
import { useDispatch } from 'react-redux';
import { registerThunk } from '../../redux/auth/operations';
import { validationSchemaRegister } from '../../helpers/registrationSchema';
import PasswordStrengthBar from 'react-password-strength-bar';
import { Icons } from '../Icons/Icons';

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
      validationSchema={validationSchemaRegister}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, values }) => (
        <Form className={s.form}>
          <div className={s.modalEllipse}></div>
          <div className={s.registerLogo}>
            <Icons
              name={'logo'}
              width={20}
              height={25}
              className={s.iconLogo}
            />
            <p className={s.regTitle}>Money Guard</p>
          </div>
          <div className={s.boxLabel}>
            <label className={s.label}>
              <div className="inputContainerLogo">
                <Icons
                  name={'name'}
                  width={17}
                  height={17}
                  className={s.iconName}
                />
                <Field
                  type="text"
                  name="username"
                  placeholder="Name"
                  className={s.regInput}
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className={s.error}
                />
              </div>
            </label>
            <label className={s.label}>
              <div className="inputContainerLogo">
                <Icons
                  name={'email'}
                  width={17}
                  height={17}
                  className={s.iconName}
                />
                <Field
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  className={s.regInput}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={s.error}
                />
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
                  type="password"
                  name="password"
                  placeholder="Password"
                  className={s.regInput}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={s.error}
                />
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
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className={s.regInput}
                />

                <PasswordStrengthBar
                  className={s.bar}
                  scoreWordClassName={s.infoBar}
                  password={values.password}
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className={s.lastError}
                />
              </div>
            </label>
          </div>
          <button className={s.but} disabled={isSubmitting} type="submit">
            Register
          </button>
          <Link to="/login" className={s.link}>
            Login
          </Link>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
