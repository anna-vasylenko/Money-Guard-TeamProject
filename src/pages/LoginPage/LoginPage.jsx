import { Toaster } from "react-hot-toast";
import LoginForm from "../../components/LoginForm/LoginForm";
import s from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <div className={s.loginPage}>
      <LoginForm />
      <Toaster />
      <div className={s.ellipse16}></div>
      <div className={s.ellipse18}></div>
      <div className={s.ellipse14}></div>
      <div className={s.ellipse17}></div>
      <div className={s.ellipse15}></div>
      <div className={s.ellipse19}></div>
    </div>
  );
};

export default LoginPage;
