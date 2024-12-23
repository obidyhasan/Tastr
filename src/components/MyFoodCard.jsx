import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { Bounce, toast } from "react-toastify";
import axios from "axios";

const MyFoodCard = ({ food }) => {
  const updateModal = useRef(null);
  const [updateFood, setUpdateFood] = useState(food);

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

  function showErrorMessage(message) {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  }

  function showSuccessMessage(message) {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  }

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

    axios
      .patch(`http://localhost:5000/api/foods/${_id}`, foodInfo)
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
    <div className="rounded-xl border p-4 flex flex-col gap-5">
      <div className="flex-1">
        <figure>
          <img
            src={image}
            className="w-full h-[200px] object-cover rounded-md"
            alt=""
          />
        </figure>

        <div className="mt-4 flex flex-col gap-3">
          <span className="badge badge-md">{category}</span>
          <div className="flex justify-between items-center gap-2">
            <h1 className="font-semibold text-xl">{name}</h1>
            <p className="font-semibold text-lg text-orange-500">${price}</p>
          </div>
          <p className="line-clamp-2 text-gray-500 text-sm">{description}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p>
          Origin: <span className="font-medium">{origin}</span>
        </p>
        <hr />
        <div className="flex justify-between items-center gap-2">
          <span className="badge badge-md badge-neutral">
            {purchaseCount} sold
          </span>
          <p>
            Quantity: <span className="font-medium">{quantity}</span>
          </p>
        </div>
        <button onClick={() => updateModal.current.showModal()} className="btn">
          Update Food
        </button>
      </div>

      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog ref={updateModal} className="modal">
        <div className="modal-box max-w-5xl">
          <form method="dialog">
            <button className=" btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-gray-100">
              ✕
            </button>
          </form>
          <div className="text-center mt-2">
            <h1 className="font-semibold text-3xl">Update Food</h1>
            <p className="mt-2 mb-5 text-gray-600">
              Modify existing food details effortlessly
            </p>
            <hr />
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
                  <button className="btn ">Add Your Food</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

MyFoodCard.propTypes = {
  food: PropTypes.object,
};

export default MyFoodCard;
