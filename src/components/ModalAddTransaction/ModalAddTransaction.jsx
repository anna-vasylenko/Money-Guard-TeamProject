import { useSelector } from "react-redux";
import { selectIsAddModalOpen } from "../../redux/modal/selectors";
import AddTransactionForm from "../AddTransactionForm/AddTransactionForm";
import ModalWrapper from "../ModalWrapper/ModalWrapper";

const ModalAddTransaction = () => {
  const isAddModalOpen = useSelector(selectIsAddModalOpen);
  return (
    <ModalWrapper isOpenModal={isAddModalOpen}>
      <AddTransactionForm />
    </ModalWrapper>
  );
};

export default ModalAddTransaction;
