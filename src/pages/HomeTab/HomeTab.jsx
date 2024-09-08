import { useDispatch } from "react-redux";
import TransactionsList from "../../components/TransactionsList/TransactionsList";
import { useEffect } from "react";
import { getTransactions } from "../../redux/transaction/operations";
import AddButton from "../../components/AddButton/AddButton";

const HomeTab = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);
  return (
    <div>
      <TransactionsList />
      <AddButton />
    </div>
  );
};

export default HomeTab;
