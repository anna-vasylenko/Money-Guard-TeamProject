import { useDispatch, useSelector } from "react-redux";

import { Icons } from "../Icons/Icons";
import { openEditModal } from "../../redux/modal/slice";
import { setCurrentTransaction } from "../../redux/transaction/slice";
import { deleteTransaction } from "../../redux/transaction/operations";
import { selectCategories } from "../../redux/transaction/selectors";
import { getTransactionCategory } from "../../helpers/transactionCategory";
import { useMedia } from "../../hooks/useMedia";
import s from "./TransactionsItem.module.css";

const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
  return new Date(dateString).toLocaleDateString("uk-UA", options);
};

const TransactionsItem = ({ transaction }) => {
  const sum = Math.abs(transaction.amount);
  const formSum = new Intl.NumberFormat().format(sum);
  const categories = useSelector(selectCategories);
  const category = getTransactionCategory(transaction.categoryId, categories);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(openEditModal());
    dispatch(setCurrentTransaction({ transaction }));
  };

  const { isMobile } = useMedia();

  return !isMobile ? (
    <tr className={s.tableSection}>
      <td className={s.date}>{formatDate(transaction.transactionDate)}</td>
      <td className={s.type}>{transaction.type === "INCOME" ? "+" : "-"}</td>
      <td className={s.category}>{category}</td>
      <td className={s.comment}>{transaction.comment}</td>
      <td className={transaction.type === "INCOME" ? s.income : s.expense}>
        {formSum}
      </td>
      <td className={s.actionBtn}>
        <button type="submit" onClick={handleClick} className={s.editBtn}>
          <Icons className={s.editIcon} name="pencil" />
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
  ) : (
    <tr
      className={
        transaction.type === "INCOME" ? s.tableSection : s.tableSectionExp
      }
    >
      <td className={s.date}>
        <span className={s.spanDate}>Date</span>
        {formatDate(transaction.transactionDate)}
      </td>
      <td className={s.type}>
        <span className={s.spanType}>Type</span>
        {transaction.type === "INCOME" ? "+" : "-"}
      </td>
      <td className={s.category}>
        <span className={s.spanCategory}>Category</span>
        {category}
      </td>
      <td className={s.comment}>
        <span className={s.spanComment}>Comment</span>
        {transaction.comment}
      </td>
      <td className={transaction.type === "INCOME" ? s.income : s.expense}>
        <span className={s.spanSum}>Sum</span>
        {sum}
      </td>
      <td className={s.actionBtn}>
        <button
          className={s.deleteBtn}
          onClick={() => {
            dispatch(deleteTransaction(transaction.id));
          }}
        >
          Delete
        </button>
        <button type="submit" onClick={handleClick} className={s.editBtn}>
          <Icons className={s.editIcon} name="pencil" width={14} height={14} />
          <span className={s.textEdit}>Edit</span>
        </button>
      </td>
    </tr>
  );
};

export default TransactionsItem;
