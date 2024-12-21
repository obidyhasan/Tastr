import Lottie from "lottie-react";
import loadingAnim from "../json/AnimationLoading.json";

const LoadingLayout = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center p-5">
      <Lottie className="max-w-72" animationData={loadingAnim} loop={true} />
    </div>
  );
};

export default LoadingLayout;
