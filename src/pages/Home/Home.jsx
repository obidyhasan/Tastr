import Navbar from "../../components/Navbar";
import BannerSection from "./BannerSection";
import TopFoodsSection from "./TopFoodsSection";

const Home = () => {
  return (
    <div>
      <div className="w-full min-h-screen bg-banner-bg bg-no-repeat bg-cover bg-center text-white">
        <nav className="w-full fixed top-0">
          <Navbar></Navbar>
        </nav>

        <header className="pt-[70px]">
          <BannerSection></BannerSection>
        </header>
      </div>

      <TopFoodsSection></TopFoodsSection>
    </div>
  );
};

export default Home;
