import { useLoaderData } from "react-router-dom";

const FoodDetails = () => {
  const loaderData = useLoaderData();
  const { name, description, image, price, category, quantity, purchaseCount } =
    loaderData;

  return (
    <div className="max-width mx-auto px-5 py-5 ">
      <div className="flex gap-5 flex-col md:flex-row border p-5 rounded-lg ">
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

            <button className="btn">Purchase</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
