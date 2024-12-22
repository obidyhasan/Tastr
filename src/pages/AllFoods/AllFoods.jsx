import { useState } from "react";
import FoodCard from "../../components/FoodCard";
import { useEffect } from "react";
import axios from "axios";
import { FiSearch } from "react-icons/fi";

const AllFoods = () => {
  const [foods, setFoods] = useState([]);
  const [searchFood, setSearchFood] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/foods")
      .then((res) => setFoods(res.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/foods?search=${searchFood}`)
      .then((res) => setFoods(res.data))
      .catch((error) => {
        console.log(error);
      });
  }, [searchFood]);

  return (
    <div>
      <div className="w-full bg-all-food-bg h-72 bg-no-repeat bg-center bg-cover flex flex-col items-center justify-center px-5">
        <h1 className="text-white font-bold text-5xl text-center">All Foods</h1>
        <p className="text-center text-gray-200 mt-2">
          Explore our tempting food collection
        </p>
      </div>

      {/* Search Functionality */}
      <div className="max-width mx-auto px-5 mt-16 text-center flex flex-col">
        <h1 className="text-3xl font-bold">Search for Deliciousness</h1>
        <p className="text-gray-500 mt-2">
          {`Type in your cravings and find exactly what you're looking for.`}
        </p>
        <div className="mt-5 flex justify-center">
          <label className="input input-bordered rounded-full w-full max-w-2xl flex items-center gap-2">
            <input
              onChange={(e) => setSearchFood(e.target.value)}
              type="text"
              className="grow"
              placeholder="Search"
            />
            <FiSearch></FiSearch>
          </label>
        </div>
      </div>

      {/* Food Card */}
      <div className="max-width my-10 mx-auto px-5 ">
        {foods.length === 0 ? (
          <h2 className="text-xl font-semibold text-center">Foods Not Found</h2>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {foods.map((food) => (
              <FoodCard key={food._id} food={food}></FoodCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllFoods;
