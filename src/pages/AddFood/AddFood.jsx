import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { showErrorMessage, showSuccessMessage } from "../../utility/toastUtils";

const AddFood = () => {
  const { user } = useAuth();
  const axiosInstance = useAxiosSecure();
  const navigate = useNavigate();
  const [category, setCategory] = useState("Choose your Category");

  function handelAddFoodSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const foodInfo = Object.fromEntries(formData.entries());
    foodInfo.price = parseFloat(foodInfo.price);
    foodInfo.quantity = parseInt(foodInfo.quantity);
    foodInfo.category = category;
    foodInfo.addByName = user?.displayName;
    foodInfo.addByEmail = user?.email;
    foodInfo.purchaseCount = 0;

    // Validation -> quantity, price, category
    if (category === "Choose your Category") {
      return showErrorMessage("Please select your food category");
    }
    if (foodInfo.quantity < 1) {
      return showErrorMessage(
        "Invalid quantity. Quantity will not be less than 1"
      );
    }
    if (foodInfo.price <= 0) {
      return showErrorMessage(
        "Invalid price. Price will not be less than or equal 0"
      );
    }

    axiosInstance
      .post(`/api/foods?email=${user?.email}`, foodInfo)
      .then((res) => {
        if (res.data.insertedId) {
          showSuccessMessage("Food Added Successfully");
          navigate("/my-foods");
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <div className="w-full bg-add-food-bg h-72 bg-no-repeat bg-center bg-cover flex flex-col items-center justify-center px-5">
        <h1 className="text-white font-bold  text-4xl sm:text-5xl text-center">
          Add Food
        </h1>
        <p className="text-center text-gray-200 mt-2">
          Share the taste of your masterpiece by adding your favorite food items
        </p>
      </div>

      <div className="max-width mx-auto px-5 my-16 text-center flex flex-col">
        <div className="w-full border p-4 rounded-lg">
          <form onSubmit={handelAddFoodSubmit} className="space-y-3">
            {/* Item 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Food Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="food name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Food Image URL</span>
                </label>
                <input
                  type="text"
                  name="image"
                  placeholder="food image url"
                  className="input input-bordered"
                  required
                />
              </div>
            </div>
            {/* Item 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Select Category</span>
                </label>
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  defaultValue={category}
                  className="select select-bordered w-full"
                >
                  <option disabled>Choose your Category</option>
                  <option value={"Burgers"}>Burgers</option>
                  <option value={"Pizzas"}>Pizzas</option>
                  <option value={"Salads"}>Salads</option>
                  <option value={"Beverages"}>Beverages</option>
                  <option value={"Sandwiches"}>Sandwiches</option>
                  <option value={"Appetizers"}>Appetizers</option>
                  <option value={"Sushi"}>Sushi</option>
                  <option value={"Pasta"}>Pasta</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Food Quantity</span>
                </label>
                <input
                  type="number"
                  name="quantity"
                  placeholder="food quantity"
                  className="input input-bordered"
                  required
                />
              </div>
            </div>
            {/* Item 3 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Food Price</span>
                </label>
                <input
                  type="text"
                  name="price"
                  placeholder="food price"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Food Origin</span>
                </label>
                <input
                  type="text"
                  name="origin"
                  placeholder="country"
                  className="input input-bordered"
                  required
                />
              </div>
            </div>
            {/* Item 4 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">{`Add By (Name)`}</span>
                </label>
                <p className="input input-bordered flex items-center text-gray-500">
                  {user?.displayName}
                </p>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">{`Add By (Email)`}</span>
                </label>
                <p className="input input-bordered flex items-center text-gray-500">
                  {user?.email}
                </p>
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Food Description</span>
              </label>
              <textarea
                name="description"
                className="textarea text-base textarea-bordered min-h-32"
                placeholder="food description"
                required
              ></textarea>
            </div>

            <div className="form-control mt-6">
              <button className="btn ">Add Your Food</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFood;
