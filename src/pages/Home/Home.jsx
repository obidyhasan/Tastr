import Navbar from "../../components/Navbar";
import ActionSection from "./ActionSection";
import BannerSection from "./BannerSection";
import CategoryFoodSection from "./CategoryFoodSection";
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
      <ActionSection></ActionSection>
      <CategoryFoodSection></CategoryFoodSection>
    </div>
  );
};

export default Home;
