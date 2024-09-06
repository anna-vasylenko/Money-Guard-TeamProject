import Modal from "react-modal";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 20,
    width: "auto",
    height: "auto",
    maxWidth: "90vw",
    maxHeight: "90vh",
    border: "none",
    backgroundColor: "black",
  },
};

Modal.setAppElement("#root");

const ModalWrapper = ({ closeModal, isOpenModal, children }) => {
  return (
    <Modal
      isOpen={isOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <button onClick={closeModal}>close</button>
      {children}
    </Modal>
  );
};

export default ModalWrapper;
