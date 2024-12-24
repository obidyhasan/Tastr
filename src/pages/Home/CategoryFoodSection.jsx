import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import FoodCard from "../../components/FoodCard";

const CategoryFoodSection = () => {
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [foodCategory, setFoodCategory] = useState("Burgers");

  useEffect(() => {
    fetch("categories.json")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    axios
      .post(`https://tastr-server.vercel.app/api/foods/category`, {
        category: foodCategory,
      })
      .then((res) => setFoods(res.data))
      .catch((error) => console.log(error));
  }, [foodCategory]);

  console.log(foods);

  return (
    <div className="max-width mx-auto px-5 py-20">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Explore Our Categories</h1>
        <p className="mt-2">
          Discover delicious food categories crafted to satisfy every craving.
          Explore now!
        </p>
      </div>

      <div className="flex flex-wrap gap-5 justify-center mt-10">
        {categories.map((cat, idx) => (
          <NavLink
            onClick={() => setFoodCategory(cat.category)}
            className={`btn rounded-full border-base-200 ${
              foodCategory === cat.category ? "btn-primary" : "btn-outline"
            }`}
            key={idx}
          >
            {cat.category}
          </NavLink>
        ))}
      </div>

      <div>
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
        </div>
      </div>
    </div>
  );
};

export default CategoryFoodSection;
