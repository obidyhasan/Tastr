import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const FoodCard = ({ food }) => {
  const {
    _id,
    name,
    description,
    image,
    price,
    category,
    quantity,
    purchaseCount,
  } = food;

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
        <hr />
        <div className="flex justify-between items-center gap-2">
          <span className="badge badge-md badge-neutral">
            {purchaseCount} sold
          </span>
          <p>
            Quantity: <span className="font-medium">{quantity}</span>
          </p>
        </div>
        <Link to={`/food-details/${_id}`} className="btn">
          View Details
        </Link>
      </div>
    </div>
  );
};

FoodCard.propTypes = {
  food: PropTypes.object,
};

export default FoodCard;
