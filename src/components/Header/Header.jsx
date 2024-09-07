import { NavLink } from "react-router-dom";
import s from "../Header/Header.module.css";
import { useMedia } from "../../hooks/useMedia";
import { Icons } from "../Icons/Icons";
// import { useSelector } from "react-redux";

const Header = () => {
  const { isTablet } = useMedia();
  // const user = useSelector(selectUser);
  // user.name;

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
          <p className={s.userName}>Name</p>
          <li className={s.itemExit}>
            <button className={s.btn} type="submit">
              <svg fill="var(--white-60)" width="18" height="18">
                <use href="../../../src/images/symbol-defs.svg#exit"></use>
              </svg>
              {isTablet && <span className={s.exitSpan}>Exit</span>}
            </button>
          </li>
        </div>
      </div>
    </header>
  );
};

export default Header;
