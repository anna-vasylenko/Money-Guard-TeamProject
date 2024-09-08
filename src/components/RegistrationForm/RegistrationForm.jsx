import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import s from "./RegistrationForm.module.css";
import { useDispatch } from "react-redux";
import { registerThunk } from "../../redux/auth/operations";
import { validationSchemaRegister } from "../../helpers/registrationSchema";
import PasswordStrengthBar from "react-password-strength-bar";

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const onSubmit = ({ email, username, password }, { resetForm }) => {
    dispatch(registerThunk({ email, username, password }));
    resetForm();
  };

  return (
    <Formik
      initialValues={{
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validationSchemaRegister}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, values }) => (
        <Form className={s.form}>
          <p className={s.title}>Money Guard</p>
          <label className={s.label}>
            <Field
              type="text"
              name="username"
              placeholder="Name"
              className={s.input}
            />
            <ErrorMessage name="username" component="div" className={s.error} />
          </label>
          <label className={s.label}>
            <Field
              type="email"
              name="email"
              placeholder="E-mail"
              className={s.input}
            />
            <ErrorMessage name="email" component="div" className={s.error} />
          </label>
          <label className={s.label}>
            <Field
              type="password"
              name="password"
              placeholder="Password"
              className={s.input}
            />

            <ErrorMessage name="password" component="div" className={s.error} />
          </label>
          <label className={s.label}>
            <Field
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className={s.input}
            />
            <PasswordStrengthBar password={values.password} />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className={s.error}
            />
          </label>
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
