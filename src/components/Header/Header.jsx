import { NavLink } from "react-router-dom";
import s from "../Header/Header.module.css";
import { useMedia } from "../../hooks/useMedia";
import { Icons } from "../Icons/Icons";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";

const Header = () => {
  const { isTablet } = useMedia();
  const { username } = useSelector(selectUser);

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
            <button className={s.btn} type="submit">
              <Icons name={"exit"} width={18} height={18} />
              {isTablet && <span className={s.exitSpan}>Exit</span>}
            </button>
          </li>
        </div>
      </div>
    </header>
  );
};

export default Header;
