import ModalEditTransaction from "../ModalEditTransaction/ModalEditTransaction";
import s from "./TransactionsItem.module.css";

const TransactionsItem = ({ transaction }) => {
  return (
    <tr>
      <td>{transaction.transactionDate}</td>
      <td>{transaction.type}</td>
      <td>{transaction.category}</td>
      <td>{transaction.comment}</td>
      <td className={transaction.type === "INCOME" ? s.income : s.expense}>
        {transaction.amount}
      </td>
      <td className={s.actionBtn}>
        <button onClick={ModalEditTransaction} className={s.editBtn}>
          <svg className={s.editIcon} width="12" height="12" stroke="#fafafa">
            <use href="../../../src/images/symbol-defs.svg#pencil"></use>
          </svg>
        </button>
        <button className={s.deleteBtn}>Delete</button>
      </td>
    </tr>
  );
};

export default TransactionsItem;
