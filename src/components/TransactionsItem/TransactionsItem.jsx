import { useDispatch } from "react-redux";
import { Icons } from "../Icons/Icons";
import s from "./TransactionsItem.module.css";
import { openEditModal } from "../../redux/modal/slice";

const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
  return new Date(dateString).toLocaleDateString("uk-UA", options);
};

const TransactionsItem = ({ transaction }) => {
  const dispatch = useDispatch();
  const sum = Math.abs(transaction.amount);
  return (
    <tr>
      <td>{formatDate(transaction.transactionDate)}</td>
      <td>{transaction.type === "INCOME" ? "+" : "-"}</td>
      <td>{transaction.category}</td>
      <td className={s.comment}>{transaction.comment}</td>
      <td className={transaction.type === "INCOME" ? s.income : s.expense}>
        {sum}
      </td>
      <td className={s.actionBtn}>
        <button
          onClick={() => {
            dispatch(openEditModal());
          }}
          className={s.editBtn}
        >
          <Icons className={s.editIcon} name={"pencil"} />
          <p className={s.textEdit}>Edit</p>
        </button>
        <button className={s.deleteBtn}>Delete</button>
      </td>
    </tr>
  );
};

export default TransactionsItem;
