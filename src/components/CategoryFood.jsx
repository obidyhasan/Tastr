import FoodCard from "./FoodCard";
import { useLoaderData } from "react-router-dom";

const CategoryFood = () => {
  const foods = useLoaderData();
  //   const [foods, setFoods] = useState([]);

  return (
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
  );
};

export default CategoryFood;
