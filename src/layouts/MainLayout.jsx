import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import useAuth from "../hooks/useAuth";
import LoadingLayout from "./LoadingLayout";
import Footer from "../components/Footer";
// import Footer from "../components/Footer";

const MainLayout = () => {
  const { loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <LoadingLayout></LoadingLayout>;
  }

  return (
    <div className="font-poppins">
      {location.pathname !== "/" && <Navbar></Navbar>}
      <div className="min-h-screen">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
