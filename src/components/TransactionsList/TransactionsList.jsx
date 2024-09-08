import s from "./TransactionsList.module.css";
import TransactionsItem from "../TransactionsItem/TransactionsItem";
import { useSelector } from "react-redux";
import { selectTransactions } from "../../redux/transaction/selectors";

const TransactionsList = () => {
  const transactions = useSelector(selectTransactions);
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.transactionDate) - new Date(a.transactionDate)
  );

  return (
    <div className={s.financeTableContainer}>
      <table className={s.financeTable}>
        <thead className={s.headTab}>
          <tr className={s.tr}>
            <th className={s.th}>Date</th>
            <th className={s.th}>Type</th>
            <th className={s.th}>Category</th>
            <th className={s.th}>Comment</th>
            <th className={s.thSum}>Sum</th>
            <th className={s.th}></th>
          </tr>
        </thead>
        <tbody className={s.th}>
          {sortedTransactions.map((transaction) => (
            <TransactionsItem key={transaction.id} transaction={transaction} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsList;
