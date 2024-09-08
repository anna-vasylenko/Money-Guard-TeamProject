import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginThunk } from "../../redux/auth/operations";
import { validationSchemaLogin } from "../../helpers/loginSchema";
import s from "./LoginForm.module.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const onSubmit = ({ email, password }, { resetForm }) => {
    dispatch(loginThunk({ email, password }));
    resetForm();
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchemaLogin}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={s.form}>
          <p className={s.title}>Money Guard</p>
          <label className={s.label}>
            <Field
              className={s.input}
              type="email"
              name="email"
              placeholder="E-mail"
            />
            <ErrorMessage name="email" component="div" />
          </label>

          <label className={s.label}>
            <Field
              className={s.input}
              type="password"
              name="password"
              placeholder="Password"
            />
            <ErrorMessage name="password" component="div" />
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
