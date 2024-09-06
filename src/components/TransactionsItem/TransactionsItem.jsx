import s from "./TransactionsItem.module.css";

const TransactionsItem = ({ transaction }) => {
  return (
    <tr>
      <td>{transaction.date}</td>
      <td>{transaction.type}</td>
      <td>{transaction.category}</td>
      <td>{transaction.comment}</td>
      <td className={transaction.type === "+" ? s.income : s.expense}>
        {transaction.sum.toFixed(2)}
      </td>
      <td className={s.actionBtn}>
        <button className={s.editBtn}>
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
