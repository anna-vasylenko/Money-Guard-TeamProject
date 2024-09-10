import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";

import { Icons } from "../Icons/Icons";

import { useMedia } from "../../hooks/useMedia";
import { selectUser } from "../../redux/auth/selectors";
import { openLogOutModal } from "../../redux/modal/slice";
import {
  selectIsAddModalOpen,
  selectIsEditModalOpen,
  selectIsLogOutModalOpen,
} from "../../redux/modal/selectors";
import s from "../Header/Header.module.css";

const Header = () => {
  const { isTablet, isMobile } = useMedia();
  const { username } = useSelector(selectUser);
  const isLogOutModalOpen = useSelector(selectIsLogOutModalOpen);
  const isEditModalOpen = useSelector(selectIsEditModalOpen);
  const isAddModalOpen = useSelector(selectIsAddModalOpen);
  const dispatch = useDispatch();

  return (
    <header
      className={clsx(
        (isLogOutModalOpen || isEditModalOpen || isAddModalOpen) &&
          isMobile &&
          s.headerMobileOpen
      )}
    >
      <div className={s.container}>
        <div className={s.containerLogo}>
          <li>
            <NavLink className={s.navLink} to="/">
              <Icons name={"logo"} width={17} height={17} />
              <p className={s.logoText}>Money Guard</p>
            </NavLink>
          </li>
        </div>
        <div className={s.containerExit}>
          <p className={s.userName}>{username}</p>
          <li className={s.itemExit}>
            <button
              className={s.btn}
              onClick={() => {
                dispatch(openLogOutModal());
              }}
              type="submit"
            >
              <Icons
                name={"exit"}
                width={18}
                height={18}
                className={s.iconExit}
              />
              {isTablet && <span className={s.exitSpan}>Exit</span>}
            </button>
          </li>
        </div>
      </div>
    </header>
  );
};

export default Header;
