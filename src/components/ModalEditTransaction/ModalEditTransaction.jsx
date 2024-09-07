import ModalWrapper from "../ModalWrapper/ModalWrapper";

const ModalEditTransaction = ({ closeModal, isOpenModal }) => {
  return (
    <ModalWrapper closeModal={closeModal} isOpenModal={isOpenModal}>
      <div>
        <p>Edit transaction</p>
      </div>
    </ModalWrapper>
  );
};

export default ModalEditTransaction;
