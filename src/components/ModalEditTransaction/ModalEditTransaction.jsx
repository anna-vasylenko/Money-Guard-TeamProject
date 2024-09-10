import { useSelector } from "react-redux";

import ModalWrapper from "../ModalWrapper/ModalWrapper";
import EditTransactionForm from "../EditTransactionForm/EditTransactionForm";

import { selectIsEditModalOpen } from "../../redux/modal/selectors";

const ModalEditTransaction = () => {
  const isEditModalOpen = useSelector(selectIsEditModalOpen);
  return (
    <ModalWrapper isOpenModal={isEditModalOpen}>
      <EditTransactionForm />
    </ModalWrapper>
  );
};
export default ModalEditTransaction;
