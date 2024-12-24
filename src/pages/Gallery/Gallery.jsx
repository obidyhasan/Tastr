import { useEffect } from "react";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import { Fullscreen, Slideshow } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";

const Gallery = () => {
  const [foodImages, setFoodImages] = useState([]);
  const [openLightbox, setOpenLightbox] = useState(false);
  const [currentImage, setCurrentImage] = useState({});
  const [sliderImages, setSliderImages] = useState([]);

  useEffect(() => {
    fetch("galleryImage.json")
      .then((res) => res.json())
      .then((data) => setFoodImages(data));
  }, []);

  function handelImage(image) {
    setOpenLightbox(true);
    setCurrentImage(image);
    const copyImages = [...foodImages];
    const remainingImages = copyImages.filter((img) => img.src !== image.src);
    setSliderImages(remainingImages);
  }

  return (
    <div>
      <Lightbox
        open={openLightbox}
        close={() => setOpenLightbox(false)}
        slides={[currentImage, ...sliderImages]}
        plugins={[Fullscreen, Slideshow]}
      />

      <div className="w-full bg-gallery-bg h-72 bg-no-repeat bg-center bg-cover flex flex-col items-center justify-center px-5">
        <h1 className="text-white font-bold sm:text-5xl text-4xl text-center">
          Gallery
        </h1>
        <p className="text-center text-gray-200 mt-2">
          Indulge in a collection of our finest food moments
        </p>
      </div>

      <div className="max-width mx-auto px-5 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {foodImages.map((food, idx) => (
            <figure
              onClick={() => handelImage({ src: food.src })}
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
    </div>
  );
};

export default Gallery;
