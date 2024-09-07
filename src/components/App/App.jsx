import { lazy, Suspense, useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Loader from "../Loader/Loader";

import PrivateRoute from "../../routes/PrivateRoute";
import RestrictedRoute from "../../routes/RestrictedRoute";
import { selectIsRefreshing } from "../../redux/auth/selectors";
import { refreshUserThunk } from "../../redux/auth/operations";
import { useMedia } from "../../hooks/useMedia";
import { getTransactionsCategories } from "../../redux/transaction/operations";

const DashboardPage = lazy(() =>
  import("../../pages/DashboardPage/DashboardPage")
);
const RegistrationPage = lazy(() =>
  import("../../pages/RegistrationPage/RegistrationPage")
);
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const HomeTab = lazy(() => import("../../pages/HomeTab/HomeTab"));
const CurrencyTab = lazy(() => import("../../pages/CurrencyTab/CurrencyTab"));
const StatisticsTab = lazy(() =>
  import("../../pages/StatisticsTab/StatisticsTab")
);

function App() {
  const dispatch = useDispatch();

  const isRefresh = useSelector(selectIsRefreshing);
  useEffect(() => {
    dispatch(refreshUserThunk());
  }, [dispatch]);
  const { isMobile } = useMedia();

  useEffect(() => {
    dispatch(getTransactionsCategories());
  }, [dispatch]);

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
