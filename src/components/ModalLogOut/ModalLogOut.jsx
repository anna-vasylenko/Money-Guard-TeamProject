import { useDispatch } from "react-redux";
import { logoutThunk } from "../../redux/auth/operations";
import ModalWrapper from "../ModalWrapper/ModalWrapper";

const ModalLogOut = ({ closeModal, isOpenModal }) => {
  const dispatch = useDispatch();

  const handleClickLogout = () => {
    dispatch(logoutThunk);
  };

  const handleClickCancel = () => {
    closeModal();
  };

  return (
    <ModalWrapper closeModal={closeModal} isOpenModal={isOpenModal}>
      <div>
        <p>Are you sure you want to log out?</p>
        <button type="button" onClick={handleClickLogout}>
          logout
        </button>
        <button type="button" onClick={handleClickCancel}>
          cancel
        </button>
      </div>
    </ModalWrapper>
  );
};

export default ModalLogOut;
