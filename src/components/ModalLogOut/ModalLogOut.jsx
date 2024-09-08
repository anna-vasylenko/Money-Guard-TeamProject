import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "../../redux/auth/operations";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import { closeModal } from "../../redux/modal/slice";
import { selectIsLogOutModalOpen } from "../../redux/modal/selectors";

const ModalLogOut = () => {
  const isLogOutModalOpen = useSelector(selectIsLogOutModalOpen);
  const dispatch = useDispatch();

  const handleClickLogout = () => {
    dispatch(logoutThunk());
  };

  const handleClickCancel = () => {
    dispatch(closeModal());
  };

  return (
    <ModalWrapper isOpenModal={isLogOutModalOpen}>
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
