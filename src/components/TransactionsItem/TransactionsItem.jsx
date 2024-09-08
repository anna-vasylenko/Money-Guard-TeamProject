import { useDispatch, useSelector } from "react-redux";
import { Icons } from "../Icons/Icons";
import s from "./TransactionsItem.module.css";
import { openEditModal } from "../../redux/modal/slice";
import { setCurrentTransaction } from "../../redux/transaction/slice";
import { deleteTransaction } from "../../redux/transaction/operations";
import { getTransactionCategory } from "../../helpers/transactionCategory";
import { selectCategories } from "../../redux/transaction/selectors";

const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
  return new Date(dateString).toLocaleDateString("uk-UA", options);
};

const TransactionsItem = ({ transaction }) => {
  const sum = Math.abs(transaction.amount);
  const categories = useSelector(selectCategories);
  const category = getTransactionCategory(transaction.categoryId, categories);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(openEditModal());
    dispatch(setCurrentTransaction({ transaction }));
  };

  return (
    <tr className={s.tableSection}>
      <td className={s.date}>{formatDate(transaction.transactionDate)}</td>
      <td className={s.type}>{transaction.type === "INCOME" ? "+" : "-"}</td>
      <td className={s.category}>{category}</td>
      <td className={s.comment}>{transaction.comment}</td>
      <td className={transaction.type === "INCOME" ? s.income : s.expense}>
        {sum}
      </td>
      <td className={s.actionBtn}>
        <button type={"submit"} onClick={handleClick} className={s.editBtn}>
          <Icons className={s.editIcon} name={"pencil"} />
          <p className={s.textEdit}>Edit</p>
        </button>
        <button
          className={s.deleteBtn}
          onClick={() => {
            dispatch(deleteTransaction(transaction.id));
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TransactionsItem;
