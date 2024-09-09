import { useSelector } from "react-redux";
import { selectBalance } from "../../redux/auth/selectors";
import s from "./Balance.module.css";

const Balance = () => {
  const userBalance = useSelector(selectBalance);
  const formattedBalance = new Intl.NumberFormat("uk-UA", {
    style: "decimal",
    minimumFractionDigits: 2,
  })
    .format(userBalance)
    .replace(",", ".");

  return (
    <div className={s.wrapper}>
      <p className={s.title}>Your balance </p>
      <p className={s.balance}>₴ {formattedBalance}</p>
    </div>
  );
};

export default Balance;
