import s from "./TransactionsList.module.css";
import TransactionsItem from "../TransactionsItem/TransactionsItem";
import { useSelector } from "react-redux";
import { selectTransactions } from "../../redux/transaction/selectors";
import { useMedia } from "../../hooks/useMedia";

const TransactionsList = () => {
  const transactions = useSelector(selectTransactions);
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.transactionDate) - new Date(a.transactionDate)
  );

  const { isMobile } = useMedia();

  return (
    <div className={s.financeTableContainer}>
      <table className={s.financeTable}>
        {!isMobile && (
          <thead className={s.headTab}>
            <tr className={s.tr}>
              <th className={s.date}>Date</th>
              <th className={s.type}>Type</th>
              <th className={s.category}>Category</th>
              <th className={s.comment}>Comment</th>
              <th className={transactions.length === 0 ? s.nonActions : s.sum}>
                Sum
              </th>
              {transactions.length !== 0 && <th className={s.actions}></th>}
            </tr>
          </thead>
        )}
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
