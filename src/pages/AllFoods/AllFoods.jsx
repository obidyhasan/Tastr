import { useState } from "react";
import FoodCard from "../../components/FoodCard";
import { useEffect } from "react";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import { Helmet } from "react-helmet";

const AllFoods = () => {
  const [foods, setFoods] = useState([]);
  const [searchFood, setSearchFood] = useState("");
  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(8);

  const numberOfPage = Math.ceil(count / itemPerPage);
  const pages = [...Array(numberOfPage).keys()];

  // Loading
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => {
    setIsLoading(false);
  }, 1000);

  useEffect(() => {
    axios
      .get(
        `https://tastr-server.vercel.app/api/foods?page=${currentPage}&size=${itemPerPage}`
      )
      .then((res) => setFoods(res.data))
      .catch((error) => {
        console.log(error);
      });
  }, [currentPage, itemPerPage]);

  useEffect(() => {
    axios
      .get("https://tastr-server.vercel.app/api/foodsCount")
      .then((res) => setCount(res.data.count))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://tastr-server.vercel.app/api/foods?page=${currentPage}&size=${itemPerPage}&search=${searchFood}`
      )
      .then((res) => {
        setFoods(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchFood, currentPage, itemPerPage]);

  function handelPrevPage() {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handelNextPage() {
    if (currentPage < numberOfPage - 1) {
      setCurrentPage(currentPage + 1);
    }
  }

  function handelOnSearch(search) {
    setSearchFood(search);
    setCurrentPage(0);
  }

  function handelOnChange(e) {
    setItemPerPage(e.target.value);
    setCurrentPage(0);
  }

  return (
    <div>
      <Helmet>
        <title>All Foods | Tastr</title>
      </Helmet>
      <div className="w-full bg-all-food-bg h-72 bg-no-repeat bg-center bg-cover flex flex-col items-center justify-center px-5">
        <h1 className="text-white font-bold sm:text-5xl text-4xl text-center">
          All Foods
        </h1>
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
              onChange={(e) => handelOnSearch(e.target.value)}
              type="text"
              className="grow"
              placeholder="Search"
            />
            <FiSearch></FiSearch>
          </label>
        </div>
      </div>

      <div>
        {isLoading ? (
          <div className="flex items-center justify-center min-h-52">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div>
            {/* Food Card */}
            <div className="max-width my-10 mx-auto px-5 ">
              {foods.length === 0 ? (
                <h2 className="text-xl font-semibold text-center">
                  Foods Not Found
                </h2>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {foods.map((food) => (
                    <FoodCard key={food._id} food={food}></FoodCard>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-center gap-4 mb-10">
              <button onClick={handelPrevPage} className="btn">
                Prev
              </button>
              <div className="flex gap-4">
                {pages.map((page) => (
                  <button
                    onClick={() => setCurrentPage(page)}
                    className={`btn min-w-12 ${
                      currentPage === page ? "btn-primary" : ""
                    }`}
                    key={page}
                  >
                    {page + 1}
                  </button>
                ))}
              </div>
              <button onClick={handelNextPage} className="btn">
                Next
              </button>
              <select
                value={itemPerPage}
                onChange={handelOnChange}
                className="select select-bordered  "
              >
                <option value={4}>4</option>
                <option value={8}>8</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllFoods;
