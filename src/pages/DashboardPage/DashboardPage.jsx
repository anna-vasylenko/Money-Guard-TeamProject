import { Suspense, useState } from "react";
import { Outlet } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import Navigation from "../../components/Navigation/Navigation";
import Header from "../../components/Header/Header";
import ModalLogOut from "../../components/ModalLogOut/ModalLogOut";
import ModalEditTransaction from "../../components/ModalEditTransaction/ModalEditTransaction";
import ModalAddTransaction from "../../components/ModalAddTransaction/ModalAddTransaction";
import s from "./DashboardPage.module.css";
import Balance from "../../components/Balance/Balance";
import { useMedia } from "../../hooks/useMedia";
import Currency from "../../components/Currency/Currency";

const DashboardPage = () => {
  const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const openLogOutModal = () => {
    setIsLogOutModalOpen(true);
    setIsEditModalOpen(false);
    setIsAddModalOpen(false);
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
    setIsLogOutModalOpen(false);
    setIsAddModalOpen(false);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
    setIsEditModalOpen(false);
    setIsLogOutModalOpen(false);
  };

  const closeModals = () => {
    setIsLogOutModalOpen(false);
    setIsEditModalOpen(false);
    setIsAddModalOpen(false);
  };

  const { isMobile } = useMedia();
  return (
    <div>
      <button onClick={openLogOutModal}>Open LogOut</button>
      <button onClick={openEditModal}>Open Edit</button>
      <button onClick={openAddModal}>Open Add</button>
      <Header />
      <main className={s.main}>
        <div className={s.navItem}>
          <div className={s.wrapper}>
            <Navigation />
            <Balance />
          </div>
          {!isMobile && <Currency />}
        </div>
        <div>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
      <ModalLogOut closeModal={closeModals} isOpenModal={isLogOutModalOpen} />
      <ModalEditTransaction
        closeModal={closeModals}
        isOpenModal={isEditModalOpen}
      />
      <ModalAddTransaction
        closeModal={closeModals}
        isOpenModal={isAddModalOpen}
      />
    </div>
  );
};

export default DashboardPage;
