import PropTypes from "prop-types";

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-base-200 rounded-lg p-4 space-y-2">
      <figure>
        <img
          src={review.image}
          className="w-12 h-12 rounded-full object-cover border border-base-100"
          alt=""
        />
      </figure>
      <h1 className="font-semibold text-lg text-primary">{review.name}</h1>
      <p className="text-sm ">{review.feedback}</p>
      <div className="flex gap-2 items-center">
        <div className="rating-sm space-x-[2px]">
          <input className="mask mask-star-2 bg-orange-400" />
          <input className="mask mask-star-2 bg-orange-400" />
          <input className="mask mask-star-2 bg-orange-400" />
          <input className="mask mask-star-2 bg-orange-400" />
          <input className="mask mask-star-2 bg-orange-400" />
        </div>
        <p className="text-sm">({review.rating})</p>
      </div>
    </div>
  );
};

ReviewCard.propTypes = {
  review: PropTypes.object,
};

export default ReviewCard;
