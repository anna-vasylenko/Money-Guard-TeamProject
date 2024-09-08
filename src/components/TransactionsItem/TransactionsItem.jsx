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
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  const handleClick = () => {
    dispatch(openEditModal());
    dispatch(setCurrentTransaction({ transaction }));
  };

  const category = getTransactionCategory(transaction.categoryId, categories);

  return (
    <tr>
      <td>{formatDate(transaction.transactionDate)}</td>
      <td>{transaction.type === "INCOME" ? "+" : "-"}</td>
      <td>{category}</td>
      <td>{transaction.comment}</td>
      <td className={transaction.type === "INCOME" ? s.income : s.expense}>
        {transaction.amount}
      </td>
      <td className={s.actionBtn}>
        <button type={"submit"} onClick={handleClick} className={s.editBtn}>
          <Icons className={s.editIcon} name={"pencil"} />
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
