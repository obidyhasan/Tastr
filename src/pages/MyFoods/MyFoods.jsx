import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";
import MyFoodCard from "../../components/MyFoodCard";

const MyFoods = () => {
  const { user } = useAuth();
  const axiosInstance = useAxiosSecure();
  const [foods, setFoods] = useState([]);

  // Loading
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => {
    setIsLoading(false);
  }, 1000);

  useEffect(() => {
    axiosInstance
      .get(`/api/my-foods?email=${user?.email}`)
      .then((res) => setFoods(res.data))
      .catch((error) => console.log(error));
  });

  return (
    <div>
      <Helmet>
        <title>My Foods | Tastr</title>
      </Helmet>
      <div className="w-full bg-my-food-bg h-72 bg-no-repeat bg-center bg-cover flex flex-col items-center justify-center px-5">
        <h1 className="text-white font-bold text-4xl sm:text-5xl text-center">
          My Foods
        </h1>
        <p className="text-center text-gray-200 mt-2">
          Manage your added food items effortlessly on the My Foods page
        </p>
      </div>

      <div>
        {isLoading ? (
          <div className="flex items-center justify-center min-h-80">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="max-width my-16 mx-auto px-5 ">
            {foods.length === 0 ? (
              <h2 className="text-xl font-semibold text-center">
                Foods Not Found
              </h2>
            ) : (
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th>Food</th>
                      <th>Price</th>
                      <th>Origin</th>
                      <th>Quantity</th>
                      <th>Sold</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {foods.map((food, idx) => (
                      <MyFoodCard
                        key={food._id}
                        food={food}
                        idx={idx}
                      ></MyFoodCard>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFoods;
