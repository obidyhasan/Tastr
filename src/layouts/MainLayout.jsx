import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import useAuth from "../hooks/useAuth";
import LoadingLayout from "./LoadingLayout";
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
      <Outlet></Outlet>
      {/* <Footer></Footer> */}
    </div>
  );
};

export default MainLayout;
