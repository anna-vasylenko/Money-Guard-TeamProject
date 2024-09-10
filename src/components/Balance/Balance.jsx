import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import s from "./Balance.module.css";

const Balance = () => {
  const { balance } = useSelector(selectUser);
  const formattedBalance = new Intl.NumberFormat("uk-UA", {
    style: "decimal",
    minimumFractionDigits: 2,
  })
    .format(balance)
    .replace(",", ".");

  return (
    <div className={s.wrapper}>
      <p className={s.title}>Your balance </p>
      <p className={s.balance}>₴ {formattedBalance}</p>
    </div>
  );
};

export default Balance;
