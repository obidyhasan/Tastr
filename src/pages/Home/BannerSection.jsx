import { Link } from "react-router-dom";

const BannerSection = () => {
  return (
    <div className="w-full banner-height flex items-center justify-center ">
      <div className="max-width px-5 py-10 mx-auto flex items-center justify-center flex-col gap-8">
        <h1 className="font-bold md:font-extrabold text-5xl md:text-7xl text-center max-w-3xl">
          <span className="outline-text text-transparent ">
            Where Every Bite
          </span>{" "}
          Tells a Story
        </h1>
        <p className="max-w-3xl text-center text-gray-300">
          Discover a world of culinary delights crafted with passion and
          precision. From exquisite dishes to unforgettable dining experiences,
          we bring you the best of taste and hospitality. Explore our menu and
          let us take your taste buds on a journey!
        </p>
        <Link
          to={"/all-foods"}
          className="btn btn-outline text-white hover:bg-white hover:text-black hover:border-none"
        >
          Explore Our Foods
        </Link>
      </div>
    </div>
  );
};

export default BannerSection;
