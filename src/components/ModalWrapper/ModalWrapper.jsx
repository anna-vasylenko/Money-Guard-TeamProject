import Modal from "react-modal";

import s from "./ModalWrapper.module.css";
import { Icons } from "../Icons/Icons";
import { customStyles } from "../../helpers/customStylesModal";

Modal.setAppElement("#root");

const ModalWrapper = ({ closeModal, isOpenModal, children }) => {
  return (
    <Modal
      isOpen={isOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div className={s.modalEllipse}></div>
      <button className={s.btnCloseModal} onClick={closeModal}>
        <Icons
          name={"close"}
          width={18}
          height={18}
        />
      </button>
      {children}
    </Modal>
  );
};

export default ModalWrapper;
