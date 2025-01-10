import PropTypes from "prop-types";
import { useRef, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import { showErrorMessage, showSuccessMessage } from "../utility/toastUtils";

const MyFoodCard = ({ food, idx }) => {
  const updateModal = useRef(null);
  const [updateFood, setUpdateFood] = useState(food);
  const axiosInstance = useAxiosSecure();
  const { user } = useAuth();

  const {
    _id,
    name,
    description,
    origin,
    image,
    price,
    category: getCategory,
    quantity,
    purchaseCount,
  } = updateFood;

  const [category, setCategory] = useState(getCategory);

  function handelUpdateFood(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const foodInfo = Object.fromEntries(formData.entries());
    foodInfo.price = parseFloat(foodInfo.price);
    foodInfo.quantity = parseInt(foodInfo.quantity);
    foodInfo.category = category;

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
      .patch(`/api/foods/${_id}?email=${user?.email}`, foodInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          showSuccessMessage("Food updated successfully");
          updateModal.current.close();
          setUpdateFood({ ...foodInfo, _id, purchaseCount });
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <tr>
        <th>{idx + 1}</th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img src={food.image} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{food.name}</div>
              <div className="text-sm mt-1">
                <span className="badge badge-md">{food.category}</span>
              </div>
            </div>
          </div>
        </td>
        <td className="font-semibold text-orange-500 text-sm">
          $ {food.price}
        </td>
        <td>{food.origin}</td>
        <td>
          <span className="badge">{food.quantity}</span>
        </td>
        <td>
          <span className="badge">{food.purchaseCount}</span>
        </td>
        <td>
          <button
            onClick={() => updateModal.current.showModal()}
            className="btn"
          >
            Update Food
          </button>
        </td>
      </tr>

      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog ref={updateModal} className="modal">
        <div className="modal-box max-w-5xl">
          <form method="dialog">
            <button className=" btn btn-sm btn-circle btn-ghost bg-base-200 absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="text-center mt-2">
            <h1 className="font-semibold text-3xl">Update Food</h1>
            <p className="mt-2 mb-5 text-gray-500">
              Modify existing food details effortlessly
            </p>
            <hr className="border-base-200" />
          </div>
          <div className="max-width mx-auto mt-5 text-center flex flex-col">
            <div className="w-full">
              <form onSubmit={handelUpdateFood} className="space-y-3">
                {/* Item 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Food Name</span>
                    </label>
                    <input
                      defaultValue={name}
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
                      defaultValue={image}
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
                      defaultValue={quantity}
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
                      defaultValue={price}
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
                      defaultValue={origin}
                      type="text"
                      name="origin"
                      placeholder="country"
                      className="input input-bordered"
                      required
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Food Description</span>
                  </label>
                  <textarea
                    defaultValue={description}
                    name="description"
                    className="textarea text-base textarea-bordered min-h-32"
                    placeholder="food description"
                    required
                  ></textarea>
                </div>

                <div className="form-control pt-4">
                  <button className="btn ">Update Your Food</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

MyFoodCard.propTypes = {
  food: PropTypes.object,
  idx: PropTypes.number,
};

export default MyFoodCard;
