import Lottie from "lottie-react";
import notfound from "../json/AnimationNotFound.json";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const NotFoundLayout = () => {
  return (
    <div className="font-poppins w-full min-h-screen p-5 flex flex-col items-center justify-center">
      <Helmet>
        <title>Not Found | Tastr</title>
      </Helmet>
      <Lottie className="max-w-2xl" animationData={notfound} loop={true} />
      <h1 className="font-semibold text-2xl my-5">Page Not Found</h1>
      <Link to={"/"} className="btn">
        Go To Home
      </Link>
    </div>
  );
};

export default NotFoundLayout;
