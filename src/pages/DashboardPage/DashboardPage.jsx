import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import Navigation from "../../components/Navigation/Navigation";
import Header from "../../components/Header/Header";

const DashboardPage = () => {
  return (
    <div>
      <Header />
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default DashboardPage;
