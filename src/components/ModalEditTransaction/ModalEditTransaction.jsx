import { useSelector } from "react-redux";
import { selectIsEditModalOpen } from "../../redux/modal/selectors";
import ModalWrapper from "../ModalWrapper/ModalWrapper";

const ModalEditTransaction = () => {
  const isEditModalOpen = useSelector(selectIsEditModalOpen);
  return (
    <ModalWrapper isOpenModal={isEditModalOpen}>
      <div>
        <p>Edit transaction</p>
      </div>
    </ModalWrapper>
  );
};

export default ModalEditTransaction;
