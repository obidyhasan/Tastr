import { useEffect } from "react";
import { useState } from "react";
import ReviewCard from "../../components/ReviewCard";
const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("customersReview.json")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <div className="max-width mx-auto px-5 pb-20">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold">
          What Our Customers Say
        </h1>
        <p className="mt-2 max-w-3xl mx-auto">
          Read genuine reviews from our happy customers who love our food and
          service. Your feedback inspires us to deliver excellence every day!
        </p>
      </div>

      <div className="mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {reviews.splice(0, 4).map((review, idx) => (
            <ReviewCard key={idx} review={review}></ReviewCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
