import AddTransactionForm from "../AddTransactionForm/AddTransactionForm";
import ModalWrapper from "../ModalWrapper/ModalWrapper";

const ModalAddTransaction = ({ closeModal, isOpenModal }) => {
  return (
    <ModalWrapper closeModal={closeModal} isOpenModal={isOpenModal}>
      <AddTransactionForm closeModal={closeModal} />
    </ModalWrapper>
  );
};

export default ModalAddTransaction;
