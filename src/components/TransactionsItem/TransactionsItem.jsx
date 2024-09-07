import { Icons } from "../Icons/Icons";
import ModalEditTransaction from "../ModalEditTransaction/ModalEditTransaction";
import s from "./TransactionsItem.module.css";

const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
  return new Date(dateString).toLocaleDateString("uk-UA", options);
};

const TransactionsItem = ({ transaction }) => {
  return (
    <tr>
      <td>{formatDate(transaction.transactionDate)}</td>
      <td>{transaction.type === "INCOME" ? "+" : "-"}</td>
      <td>{transaction.category}</td>
      <td>{transaction.comment}</td>
      <td className={transaction.type === "INCOME" ? s.income : s.expense}>
        {transaction.amount}
      </td>
      <td className={s.actionBtn}>
        <button onClick={ModalEditTransaction} className={s.editBtn}>
          <Icons className={s.editIcon} name={"pencil"} />
        </button>
        <button className={s.deleteBtn}>Delete</button>
      </td>
    </tr>
  );
};

export default TransactionsItem;
