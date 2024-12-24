import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-accent">
      <div className="max-width mx-auto px-5 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
          <div className="sm:col-span-2">
            <h1 className="text-white font-bold text-4xl">Tastr</h1>
            <p className="text-gray-100 mt-4">
              Stay connected with us! Explore our menu, contact us for
              inquiries, or follow us on social media to never miss out on our
              latest offers and updates.
            </p>
          </div>
          <div>
            <h2 className="text-white font-semibold text-xl">Quick Links</h2>
            <div className="flex flex-col gap-2 mt-5">
              <Link to={"/"} className="text-gray-100 underline">
                Home
              </Link>
              <Link to={"/all-foods"} className="text-gray-100 underline">
                All Foods
              </Link>
              <Link to={"/gallery"} className="text-gray-100 underline">
                Gallery
              </Link>
            </div>
          </div>
          <div>
            <h2 className="text-white font-semibold text-xl">Follow Us</h2>
            <div className="flex flex-col gap-2 mt-5">
              <p className="text-gray-100 underline cursor-pointer">Facebook</p>
              <p className="text-gray-100 underline cursor-pointer">
                Instagram
              </p>
              <p className="text-gray-100 underline cursor-pointer">Twitter</p>
            </div>
          </div>
          <div>
            <h2 className="text-white font-semibold text-xl">Contact</h2>
            <div className="flex flex-col gap-2 mt-5">
              <p className="text-gray-100">Phone: +1 (123) 456-7890</p>
              <p className="text-gray-100 ">Email: support@testr.com</p>
              <p className="text-gray-100">Address: Gourmet City, USA</p>
            </div>
          </div>
        </div>
        <p className="text-gray-100 text-center mt-16 -mb-12">
          &#169; Copyright 2025. All right reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
