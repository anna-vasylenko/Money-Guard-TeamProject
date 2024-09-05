import { useSelector } from "react-redux";

const TransactionsList = () => {
  const transactionData = useSelector();

  return <div>TransactionsList</div>;
};

export default TransactionsList;
