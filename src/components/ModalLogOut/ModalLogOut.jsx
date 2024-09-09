import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "../../redux/auth/operations";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import { closeModal } from "../../redux/modal/slice";
import { selectIsLogOutModalOpen } from "../../redux/modal/selectors";
import s from "./ModalLogOut.module.css";
import { Icons } from "../Icons/Icons";
import { useMedia } from "../../hooks/useMedia";

const ModalLogOut = () => {
  const { isMobile } = useMedia;
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
      <div className={s.modal}>
        {!isMobile && (
          <div className={s.logoWrapper}>
            <Icons name={"logo"} width={36} height={36} />
            <p className={s.logoText}>Money Guard</p>
          </div>
        )}
        <p className={s.text}>Are you sure you want to log out?</p>
        <button
          className={s.buttonLogOut}
          type="button"
          onClick={handleClickLogout}
        >
          logout
        </button>
        <button
          className={s.buttonCancel}
          type="button"
          onClick={handleClickCancel}
        >
          cancel
        </button>
      </div>
    </ModalWrapper>
  );
};

export default ModalLogOut;
