import { useDispatch } from "react-redux";
import Currency from "../../components/Currency/Currency";
import TransactionsList from "../../components/TransactionsList/TransactionsList";
import { useMedia } from "../../hooks/useMedia";
import { useEffect } from "react";
import { getTransactions } from "../../redux/transaction/operations";
import AddButton from "../../components/AddButton/AddButton";

const HomeTab = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);
  const { isMobile } = useMedia();
  return (
    <div>
      {!isMobile && <Currency />}
      <TransactionsList />
      <AddButton />
    </div>
  );
};

export default HomeTab;
