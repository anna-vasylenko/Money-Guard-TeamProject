import { Suspense, useEffect } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
// import Layout from "../Layout/Layout";
import Loader from "../Loader/Loader";
import DashboardPage from "../../pages/DashboardPage/DashboardPage";
import RegistrationPage from "../../pages/RegistrationPage/RegistrationPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import HomeTab from "../../pages/HomeTab/HomeTab";
import CurrencyTab from "../../pages/CurrencyTab/CurrencyTab";
import StatisticsTab from "../../pages/StatisticsTab/StatisticsTab";
// import { useDispatch } from "react-redux";
// import { logoutThunk, registerThunk } from "../../redux/auth/operations";

function App() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(
  //     registerThunk({
  //       username: "Anna",
  //       email: "zaebalas.sulno@dof.fs",
  //       password: "1111dcdc",
  //     })
  //   );
  // }, [dispatch]);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route
          path="/"
          element={
            // <PrivateRoute>
            <DashboardPage />
            // </PrivateRoute>
          }
        >
          <Route index element={<HomeTab />} />
          <Route path="/currency" element={<CurrencyTab />} />
          <Route path="/statistics" element={<StatisticsTab />} />
        </Route>

        <Route
          path="register"
          element={
            // <RestrictedRoute>
            <RegistrationPage />
            // </RestrictedRoute>
          }
        />

        <Route
          path="login"
          element={
            // <RestrictedRoute>
            <LoginPage />
            // </RestrictedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
}

export default App;
