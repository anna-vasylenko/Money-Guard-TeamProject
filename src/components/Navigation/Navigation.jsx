import { NavLink } from "react-router-dom";
import { useMedia } from "../../hooks/useMedia";
// import s from "./Navigation.module.css";

const Navigation = () => {
  const { isTablet, isMobile } = useMedia();
  return (
    <div>
      <ul>
        <li>
          <NavLink to="/">
            {isMobile && (
              <svg width="18" height="18">
                <use href="../../../src/images/symbol-defs.svg#home"></use>
              </svg>
            )}
            {isTablet && <span>Home</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/statistics">
            {isMobile && (
              <svg width="18" height="18">
                <use href="../../../src/images/symbol-defs.svg#statistics"></use>
              </svg>
            )}
            {isTablet && <span>Statistics</span>}
          </NavLink>
        </li>
        {isMobile && (
          <li>
            <NavLink to="/currency">
              <svg width="18" height="18">
                <use href="../../../src/images/symbol-defs.svg#dollar"></use>
              </svg>
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navigation;
