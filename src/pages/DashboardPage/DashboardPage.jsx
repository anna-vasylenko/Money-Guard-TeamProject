import { Suspense, useState } from "react";
import { Outlet } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import Navigation from "../../components/Navigation/Navigation";
import Header from "../../components/Header/Header";
import ModalWrapper from "../../components/ModalWrapper/ModalWrapper";

const DashboardPage = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const openModal = () => {
    setIsOpenModal(true);
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Header />
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      <ModalWrapper closeModal={closeModal} isOpenModal={isOpenModal} />
    </div>
  );
};

export default DashboardPage;
