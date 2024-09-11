import { useSelector } from "react-redux";

import AddTransactionForm from "../AddTransactionForm/AddTransactionForm";
import ModalWrapper from "../ModalWrapper/ModalWrapper";

import { selectIsAddModalOpen } from "../../redux/modal/selectors";

const ModalAddTransaction = () => {
  const isAddModalOpen = useSelector(selectIsAddModalOpen);
  return (
    <ModalWrapper isOpenModal={isAddModalOpen}>
      <AddTransactionForm />
    </ModalWrapper>
  );
};

export default ModalAddTransaction;
