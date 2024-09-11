import { Toaster } from "react-hot-toast";

import RegistrationForm from "../../components/RegistrationForm/RegistrationForm.jsx";
import s from "./RegistrationPage.module.css";

const RegistrationPage = () => {
  return (
    <div className={s.pageRegister}>
      <RegistrationForm />
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

export default RegistrationPage;
