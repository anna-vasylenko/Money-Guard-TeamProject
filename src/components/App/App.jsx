import { Suspense, useEffect } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Loader from "../Loader/Loader";
import DashboardPage from "../../pages/DashboardPage/DashboardPage";
import RegistrationPage from "../../pages/RegistrationPage/RegistrationPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import HomeTab from "../../pages/HomeTab/HomeTab";
import CurrencyTab from "../../pages/CurrencyTab/CurrencyTab";
import StatisticsTab from "../../pages/StatisticsTab/StatisticsTab";
import { useDispatch, useSelector } from "react-redux";

import { loginThunk, refreshUserThunk } from "../../redux/auth/operations";
import PrivateRoute from "../../routes/PrivateRoute";
import RestrictedRoute from "../../routes/RestrictedRoute";
import { selectIsRefreshing } from "../../redux/auth/selectors";
import { useMedia } from "../../hooks/useMedia";

function App() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(
  //     registerThunk({
  //       username: "Anna",
  //       email: "zaebalas.sulnooo@dof.fs",
  //       password: "1111dcdc",
  //     })
  //   );
  // }, [dispatch]);

  useEffect(() => {
    dispatch(
      loginThunk({
        email: "zaebalas.sulnooo@dof.fs",
        password: "1111dcdc",
      })
    );
  }, [dispatch]);

  const isRefresh = useSelector(selectIsRefreshing);
  useEffect(() => {
    dispatch(refreshUserThunk());
  }, [dispatch]);
  const { isMobile } = useMedia();

  return isRefresh ? (
    <Loader />
  ) : (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        >
          <Route index element={<HomeTab />} />
          {isMobile && <Route path="/currency" element={<CurrencyTab />} />}

          <Route path="/statistics" element={<StatisticsTab />} />
        </Route>

        <Route
          path="register"
          element={
            <RestrictedRoute>
              <RegistrationPage />
            </RestrictedRoute>
          }
        />

        <Route
          path="login"
          element={
            <RestrictedRoute>
              <LoginPage />
            </RestrictedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
}

export default App;
