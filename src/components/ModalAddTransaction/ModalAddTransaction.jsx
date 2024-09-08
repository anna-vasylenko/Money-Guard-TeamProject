import { useSelector } from "react-redux";
import { selectIsAddModalOpen } from "../../redux/modal/selectors";
import AddTransactionForm from "../AddTransactionForm/AddTransactionForm";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
// import AddExpenseTransactionForm from "../AddExpenseTransactionForm/AddExpenseTransactionForm";

const ModalAddTransaction = () => {
  const isAddModalOpen = useSelector(selectIsAddModalOpen);
  return (
    <ModalWrapper isOpenModal={isAddModalOpen}>
      {/* <AddExpenseTransactionForm /> */}
      <AddTransactionForm />
    </ModalWrapper>
  );
};

export default ModalAddTransaction;
