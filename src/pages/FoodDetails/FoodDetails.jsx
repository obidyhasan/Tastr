import { Helmet } from "react-helmet";
import { Link, useLoaderData } from "react-router-dom";

const FoodDetails = () => {
  const loaderData = useLoaderData();
  const {
    _id,
    name,
    description,
    image,
    price,
    category,
    quantity,
    purchaseCount,
  } = loaderData;

  return (
    <div>
      <Helmet>
        <title>Food Details | Tastr</title>
      </Helmet>

      <div className="w-full bg-my-food-bg h-72 bg-no-repeat bg-center bg-cover flex flex-col items-center justify-center px-5">
        <h1 className="text-white font-bold text-4xl sm:text-5xl text-center">
          Food Details
        </h1>
        <p className="text-center text-gray-200 mt-2">
          Explore the dish with details, price, and reviews.
        </p>
      </div>

      <div className="max-width mx-auto px-5 py-5 my-16">
        <div className="flex gap-5 flex-col md:flex-row border border-base-200 p-5 rounded-lg ">
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
            <div className="flex flex-col gap-3">
              <span className="badge badge-md">{category}</span>

              <h1 className="font-bold text-2xl">{name}</h1>
              <p className="font-semibold text-2xl text-orange-500">${price}</p>
              <p className="font-semibold text-lg ">Description </p>
              <p className=" text-gray-500 text-base">{description}</p>

              <span className="badge badge-lg badge-neutral">
                {purchaseCount} sold
              </span>
              <p className="text-lg font-medium">
                Quantity: <span className="">{quantity}</span>
              </p>

              <Link to={`/purchase/${_id}`} className="btn">
                Purchase
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
