import { NavLink } from "react-router-dom";
import { useMedia } from "../../hooks/useMedia";
import { Icons } from "../Icons/Icons";
// import s from "./Navigation.module.css";

const Navigation = () => {
  const { isMobile } = useMedia();
  return (
    <div>
      <ul>
        <li>
          <NavLink to="/">
            <Icons name={"home"} width={18} height={18} />
            {!isMobile && <span>Home</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/statistics">
            <Icons name={"statistics"} width={18} height={18} />
            {!isMobile && <span>Statistics</span>}
          </NavLink>
        </li>
        {isMobile && (
          <li>
            <NavLink to="/currency">
              <Icons name={"dollar"} width={18} height={18} />
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navigation;
