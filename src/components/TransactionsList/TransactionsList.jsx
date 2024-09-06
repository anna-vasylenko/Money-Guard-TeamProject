// import { useSelector } from "react-redux";
import s from "./TransactionsList.module.css";
import TransactionsItem from "../TransactionsItem/TransactionsItem";

const transactions = [
  {
    date: "04.01.23",
    type: "-",
    category: "Other",
    comment: "Gift for your wife",
    sum: 300.0,
  },
  {
    date: "05.01.23",
    type: "+",
    category: "Income",
    comment: "January bonus",
    sum: 8000.0,
  },
  {
    date: "07.01.23",
    type: "-",
    category: "Car",
    comment: "Oil",
    sum: 1000.0,
  },
  {
    date: "07.01.23",
    type: "-",
    category: "Products",
    comment: "Vegetables for the week",
    sum: 280.0,
  },
  {
    date: "07.01.23",
    type: "+",
    category: "Income",
    comment: "Gift",
    sum: 1000.0,
  },
];

const TransactionsList = () => {
  // const transactionData = useSelector();
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
          {transactions.map((transaction, index) => (
            <TransactionsItem key={index} transaction={transaction} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsList;
