import Modal from "react-modal";
import { useDispatch } from "react-redux";

import s from "./ModalWrapper.module.css";
import { Icons } from "../Icons/Icons";
import { customStyles } from "../../helpers/customStylesModal";
import { closeModal } from "../../redux/modal/slice";

Modal.setAppElement("#root");

const ModalWrapper = ({ children, isOpenModal }) => {
  const dispatch = useDispatch();

  return (
    <Modal
      isOpen={isOpenModal}
      onRequestClose={() => dispatch(closeModal())}
      style={customStyles}
    >
      <div className={s.modalEllipse}></div>
      <button
        className={s.btnCloseModal}
        onClick={() => {
          dispatch(closeModal());
        }}
      >
        <Icons name={"close"} width={18} height={18} />
      </button>
      <div className={s.modalContent}>{children}</div>
    </Modal>
  );
};

export default ModalWrapper;
