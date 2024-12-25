import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { showErrorMessage, showSuccessMessage } from "../utility/toastUtils";

const Login = () => {
  const { userLogin, setLoading, googleAuthentication } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  function handelOnSubmit(e) {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    // Password Validation
    if (password.length < 6) {
      return showErrorMessage("Password length must be at least 6 character");
    }

    userLogin(email, password)
      .then(() => {
        setLoading(false);
        showSuccessMessage("Login successfully");
        navigate(
          `${
            location.state &&
            location.state !== "/my-foods" &&
            location.state !== "/my-orders"
              ? location.state
              : "/"
          }`
        );
      })
      .catch((error) => {
        setLoading(false);
        e.target.reset();
        showErrorMessage("Invalid email or password. Try again");
        console.log(error);
      });
  }

  function handelGoogleLogin() {
    googleAuthentication()
      .then(() => {
        setLoading(false);
        showSuccessMessage("Login successfully");
        navigate(
          `${
            location.state &&
            (location.state !== "/my-foods" || location.state !== "/my-orders")
              ? location.state
              : "/"
          }`
        );
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }

  return (
    <div className="max-width mx-auto px-5 font-roboto text-textColor">
      <div className=" w-full max-w-xs md:max-w-sm mx-auto py-28">
        <p className="text-blue-500 text-center text-base">Welcome back!</p>
        <h1 className="text-center font-semibold text-3xl mt-4 mb-2">
          Member Login
        </h1>
        <p className="text-gray-500 text-center text-sm">
          Access to all features. No credit card require.
        </p>

        <button
          onClick={handelGoogleLogin}
          className="btn btn-outline border-gray-200 font-medium rounded w-full mt-6"
        >
          <FcGoogle className="text-xl"></FcGoogle> Sign in with Google
        </button>

        <div className="flex items-center my-5">
          <div className="h-[1px] border-t-[1px] flex-1 border-base-200"></div>
          <p className="px-5 text-gray-500">Or continue with</p>
          <div className="h-[1px] border-t-[1px] flex-1 border-base-200"></div>
        </div>

        <form onSubmit={handelOnSubmit} className="flex flex-col gap-4">
          <div className="form-control">
            <label className="mb-2">
              <span className="label-text text-gray-600">Email Address *</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input rounded input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="mb-2">
              <span className="label-text text-gray-600">Password *</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="input rounded input-bordered"
              required
            />
          </div>
          <div className="form-control mt-5">
            <button className="btn rounded bg-textColor border-none text-primary">
              Login
            </button>
          </div>
        </form>

        <p className="text-gray-700 text-sm text-center mt-5">
          {`Don't have an Account? `}{" "}
          <Link className="text-blue-500 font-medium" to={"/register"}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
