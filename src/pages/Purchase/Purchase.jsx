import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { showErrorMessage, showSuccessMessage } from "../../utility/toastUtils";

const Purchase = () => {
  const loaderData = useLoaderData();
  const { user } = useAuth();
  const axiosInstance = useAxiosSecure();
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [buttonDisable, setButtonDisable] = useState(false);
  const navigate = useNavigate();
  const { _id, name, image, price, quantity, addByEmail } = loaderData;

  useEffect(() => {
    // Quantity Validation
    if (orderQuantity < 1) {
      showErrorMessage("Invalid quantity!");
      setButtonDisable(true);
      return;
    }
    if (orderQuantity > quantity) {
      setButtonDisable(true);
      showErrorMessage("Quantity is not available!");
      return;
    }

    setButtonDisable(false);
  }, [orderQuantity, quantity]);

  function handelPurchaseFood(e) {
    e.preventDefault();

    // const orderQuantity = parseInt(e.target.quantity.value);
    const foodId = _id;
    const buyerName = user?.displayName;
    const buyerEmail = user?.email;
    const buyingDate = Date.now();

    const orderFood = {
      foodId,
      name,
      image,
      price,
      orderQuantity,
      buyerName,
      buyerEmail,
      buyingDate,
    };

    axiosInstance
      .post(`/api/orders?email=${user?.email}`, orderFood)
      .then((res) => {
        if (res.data.insertedId) {
          showSuccessMessage("Order Confirmed");
          navigate("/my-orders");
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <div className="w-full bg-food-purchase-bg h-72 bg-no-repeat bg-center bg-cover flex flex-col items-center justify-center px-5">
        <h1 className="text-white font-bold sm:text-5xl text-4xl text-center">
          Checkout
        </h1>
        <p className="text-center text-gray-200 mt-2">
          Finalize your order and get ready to enjoy your meal.
        </p>
      </div>

      <div className="max-width mx-auto px-5 py-5">
        <div className="flex gap-5 flex-col md:flex-row border p-5 rounded-lg my-10">
          <div className="w-full md:w-2/5">
            <figure className="w-full h-full">
              <img
                src={image}
                className="rounded-lg w-full h-full object-cover"
                alt=""
              />
            </figure>
          </div>

          <div className="w-full md:w-3/5 flex flex-col justify-center">
            <div className="w-full">
              <div className="space-y-2">
                <h1 className="font-semibold text-xl">{name}</h1>
                <div className="flex justify-between items-center gap-2">
                  <p className="text-base text-gray-600">
                    Available Quantity: <span className="">{quantity}</span>
                  </p>
                  <p className="font-semibold text-lg text-orange-500">
                    ${price}
                  </p>
                </div>
                <hr />
              </div>
              <form onSubmit={handelPurchaseFood} className="">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Buyer Name</span>
                  </label>
                  <p className="input input-bordered flex items-center">
                    {user?.displayName}
                  </p>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Buyer Email</span>
                  </label>
                  <p className="input input-bordered flex items-center">
                    {user?.email}
                  </p>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Quantity</span>
                  </label>
                  <input
                    onChange={(e) => setOrderQuantity(parseInt(e.target.value))}
                    type="number"
                    placeholder="quantity"
                    name="quantity"
                    defaultValue={orderQuantity.toString()}
                    className="input input-bordered"
                    required
                  />
                </div>

                {addByEmail === user?.email && (
                  <div>
                    <h1 className="text-sm mt-2 text-orange-500">{`You can't purchase this food. Because it's your added food.`}</h1>
                  </div>
                )}

                <div className="form-control mt-6">
                  {buttonDisable || addByEmail === user?.email ? (
                    <button disabled className="btn">
                      Purchase
                    </button>
                  ) : (
                    <button className="btn">Purchase</button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
