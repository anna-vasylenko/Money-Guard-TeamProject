import { useDispatch } from "react-redux";
import Currency from "../../components/Currency/Currency";
import TransactionsList from "../../components/TransactionsList/TransactionsList";
import { useMedia } from "../../hooks/useMedia";
import { useEffect } from "react";
import { getTransactions } from "../../redux/transaction/operations";

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
    </div>
  );
};

export default HomeTab;
