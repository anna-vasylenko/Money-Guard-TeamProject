import { useDispatch } from "react-redux";
import TransactionsList from "../../components/TransactionsList/TransactionsList";
import { useEffect } from "react";
import { getTransactions } from "../../redux/transaction/operations";
import AddButton from "../../components/AddButton/AddButton";
import { useMedia } from "../../hooks/useMedia";
import Balance from "../../components/Balance/Balance";

const HomeTab = () => {
  const { isMobile } = useMedia();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  return (
    <div>
      {isMobile && <Balance />}
      <TransactionsList />
      <AddButton />
    </div>
  );
};

export default HomeTab;
