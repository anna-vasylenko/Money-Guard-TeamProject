import { NavLink } from "react-router-dom";
import s from "../Header/Header.module.css";
import { useMedia } from "../../hooks/useMedia";
import { Icons } from "../Icons/Icons";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { openLogOutModal } from "../../redux/modal/slice";

const Header = () => {
  const { isTablet } = useMedia();
  const { username } = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <header>
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
