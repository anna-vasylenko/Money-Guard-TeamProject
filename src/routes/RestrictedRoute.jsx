import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/selectors";
import { Navigate } from "react-router-dom";

const RestrictedRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to="/" /> : children;
};

export default RestrictedRoute;
