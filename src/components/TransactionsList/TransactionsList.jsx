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
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Category</th>
            <th>Comment</th>
            <th>Sum</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map((transaction, index) => (
            <TransactionsItem key={index} transaction={transaction} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsList;
