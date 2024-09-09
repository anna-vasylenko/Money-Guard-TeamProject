import { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useMedia } from "../../hooks/useMedia";
import Loader from "../../components/Loader/Loader";
import Navigation from "../../components/Navigation/Navigation";
import Header from "../../components/Header/Header";
import ModalLogOut from "../../components/ModalLogOut/ModalLogOut";
import ModalEditTransaction from "../../components/ModalEditTransaction/ModalEditTransaction";
import ModalAddTransaction from "../../components/ModalAddTransaction/ModalAddTransaction";
import s from "./DashboardPage.module.css";
import Balance from "../../components/Balance/Balance";
import Currency from "../../components/Currency/Currency";
import { getTransactions } from "../../redux/transaction/operations";
import { useDispatch } from "react-redux";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { isMobile } = useMedia();

  useEffect(() => {
    dispatch(getTransactions());
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
            <Suspense fallback={<Loader />}>
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
      </div>
    </div>
  );
};

export default DashboardPage;
