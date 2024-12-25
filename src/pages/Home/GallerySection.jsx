import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "yet-another-react-lightbox/styles.css";

const GallerySection = () => {
  const [foodImages, setFoodImages] = useState([]);

  useEffect(() => {
    fetch("galleryImage.json")
      .then((res) => res.json())
      .then((data) => setFoodImages(data));
  }, []);

  return (
    <div className="max-width mx-auto px-5 pb-20">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold">
          Delicious Moments Captured
        </h1>
        <p className="mt-2">
          Feast your eyes on our mouthwatering dishes, beautifully presented and
          packed with flavor
        </p>
      </div>

      <div className="mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {foodImages.splice(0, 4).map((food, idx) => (
            <figure
              key={idx}
              className="transform hover:-translate-y-2 duration-300"
            >
              <img
                src={food.src}
                className="w-full h-[250px] object-cover rounded-md"
                alt=""
              />
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-10 text-center">
        <Link to={"/gallery"} className="btn btn-outline">
          See All Images
        </Link>
      </div>
    </div>
  );
};

export default GallerySection;
