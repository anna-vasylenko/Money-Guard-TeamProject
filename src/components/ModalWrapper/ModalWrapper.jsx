import Modal from "react-modal";
import s from "./ModalWrapper.module.css";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    backdropFilter: "blur(3.5px)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 20,
    width: "540px",
    height: "589px",
    maxWidth: "90vw",
    maxHeight: "90vh",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.10)",
    boxShadow: "0px 4px 60px 0px rgba(0, 0, 0, 0.25)",
    backdropFilter: "blur(50px)",
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
      <button className={s.btnCloseModal} onClick={closeModal}>
        <svg width="18" height="18" stroke="#FBFBFB">
          <use href="../../../src/images/symbol-defs.svg#close"></use>
        </svg>
      </button>
      {children}
    </Modal>
  );
};

export default ModalWrapper;
