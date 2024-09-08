import { useSelector } from "react-redux";
import { selectIsEditModalOpen } from "../../redux/modal/selectors";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import EditTransactionForm from "../EditTransactionForm/EditTransactionForm";

const ModalEditTransaction = () => {
  const isEditModalOpen = useSelector(selectIsEditModalOpen);
  return (
    <ModalWrapper isOpenModal={isEditModalOpen}>
      <EditTransactionForm />
    </ModalWrapper>
  );
};

export default ModalEditTransaction;
