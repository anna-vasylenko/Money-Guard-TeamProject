// import { useSelector } from "react-redux";
import s from "./TransactionsList.module.css";
import TransactionsItem from "../TransactionsItem/TransactionsItem";

const TransactionsList = ({ transactions }) => {
  // const transactionData = useSelector();
  return (
    <div className={s.financeTableContainer}>
      <table className={s.financeTable}>
        <thead>
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
          {transactions.map((transaction, index) => (
            <TransactionsItem key={index} transaction={transaction} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsList;
