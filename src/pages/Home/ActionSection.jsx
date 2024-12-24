import { Link } from "react-router-dom";

const ActionSection = () => {
  return (
    <div>
      <div className="w-full bg-all-food-bg min-h-80 bg-no-repeat bg-center bg-cover flex flex-col items-center justify-center">
        <div className="max-width mx-auto px-5 flex items-center justify-center flex-col gap-4">
          <h1 className="text-white font-bold sm:text-4xl text-3xl text-center">
            Discover Deliciousness!
          </h1>
          <p className="text-center text-gray-200 mt-2 max-w-3xl">
            Indulge in a world of flavors with our freshly prepared dishes,
            crafted to satisfy your cravings. Order now and experience the taste
            of perfection!
          </p>
          <Link
            to={"/all-foods"}
            className="btn btn-outline text-white hover:bg-white hover:text-black hover:border-none"
          >
            Order Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ActionSection;
