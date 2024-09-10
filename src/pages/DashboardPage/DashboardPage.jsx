import { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";

import Navigation from "../../components/Navigation/Navigation";
import Header from "../../components/Header/Header";
import ModalLogOut from "../../components/ModalLogOut/ModalLogOut";
import ModalEditTransaction from "../../components/ModalEditTransaction/ModalEditTransaction";
import ModalAddTransaction from "../../components/ModalAddTransaction/ModalAddTransaction";
import Balance from "../../components/Balance/Balance";
import Currency from "../../components/Currency/Currency";
import LoaderDashboard from "../../components/LoaderDashboard/LoaderDashboard";

import {
  getTransactions,
  getTransactionsCategories,
} from "../../redux/transaction/operations";
import { useMedia } from "../../hooks/useMedia";
import s from "./DashboardPage.module.css";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { isMobile } = useMedia();

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTransactionsCategories());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <div className={s.container}>
        <main className={s.main}>
          <div className={s.navItem}>
            <div className={s.wrapper}>
              <Navigation />
              {!isMobile && <Balance />}
            </div>
            {!isMobile && <Currency />}
          </div>

          <div>
            <Suspense fallback={<LoaderDashboard />}>
              <Outlet />
            </Suspense>
          </div>
          <div className={s.ellipse16}></div>
          <div className={s.ellipse18}></div>
          <div className={s.ellipse14}></div>
          <div className={s.ellipse17}></div>
          <div className={s.ellipse15}></div>
          <div className={s.ellipse19}></div>
        </main>
        <ModalLogOut />
        <ModalEditTransaction />
        <ModalAddTransaction />
        <Toaster />
      </div>
    </div>
  );
};

export default DashboardPage;
