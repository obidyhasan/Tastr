import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import FoodCard from "../../components/FoodCard";
import { Link } from "react-router-dom";

const TopFoodsSection = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    axios
      .get("https://tastr-server.vercel.app/api/top-foods")
      .then((res) => setFoods(res.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="max-width mx-auto px-5 py-20">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold">Most Loved Dishes</h1>
        <p className="mt-2">
          {`These dishes are loved by everyone. Discover why they're our
          bestsellers!`}
        </p>
      </div>

      <div className="mt-10">
        <div>
          {foods.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {foods.map((food) => (
                <FoodCard key={food._id} food={food}></FoodCard>
              ))}
            </div>
          ) : (
            <h2 className="text-xl font-semibold text-center">
              Foods Not Found
            </h2>
          )}
        </div>

        <div className="mt-10 text-center">
          <Link to={"/all-foods"} className="btn btn-outline">
            See All Foods
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopFoodsSection;
