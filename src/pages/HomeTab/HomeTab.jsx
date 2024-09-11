import { useDispatch } from "react-redux";
import { useEffect } from "react";

import AddButton from "../../components/AddButton/AddButton";
import Balance from "../../components/Balance/Balance";
import TransactionsList from "../../components/TransactionsList/TransactionsList";

import { getTransactions } from "../../redux/transaction/operations";
import { useMedia } from "../../hooks/useMedia";

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
