import { useEffect, useState } from "react";
import MyFoodCard from "../../components/MyFoodCard";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const MyFoods = () => {
  const { user } = useAuth();
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/my-foods?email=${user?.email}`)
      .then((res) => setFoods(res.data))
      .catch((error) => console.log(error));
  }, [user?.email]);

  return (
    <div>
      <div className="w-full bg-all-food-bg h-72 bg-no-repeat bg-center bg-cover flex flex-col items-center justify-center px-5">
        <h1 className="text-white font-bold text-5xl text-center">My Foods</h1>
        <p className="text-center text-gray-200 mt-2">
          Manage your added food items effortlessly on the My Foods page
        </p>
      </div>

      {/* Food Card */}
      <div className="max-width my-16 mx-auto px-5 ">
        {foods.length === 0 ? (
          <h2 className="text-xl font-semibold text-center">Foods Not Found</h2>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {foods.map((food) => (
              <MyFoodCard key={food._id} food={food}></MyFoodCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFoods;
