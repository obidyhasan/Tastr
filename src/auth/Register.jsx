import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { showErrorMessage, showSuccessMessage } from "../utility/toastUtils";
import { Helmet } from "react-helmet";

const Register = () => {
  const { userRegister, userProfileUpdate, setLoading } = useAuth();
  const navigate = useNavigate();

  function handelUserRegister(e) {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const name = form.name.value;
    const photo = form.photo.value;
    const password = form.password.value;

    // Password Validation
    if (password.length < 6) {
      return showErrorMessage("Password length must be at least 6 character");
    }
    const uppercaseRegex = /^(?=.*[A-Z]).*$/;
    if (!uppercaseRegex.test(password)) {
      return showErrorMessage("Must have an Uppercase letter in the password");
    }

    const lowercaseRegex = /^(?=.*[a-z]).*$/;
    if (!lowercaseRegex.test(password)) {
      return showErrorMessage("Must have a Lowercase letter in the password");
    }

    userRegister(email, password)
      .then(() => {
        setLoading(false);
        const userInfo = {
          displayName: name,
          photoURL: photo,
        };

        userProfileUpdate(userInfo)
          .then(() => {
            setLoading(false);
            showSuccessMessage("Register successfully");
            navigate("/");
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
          });
      })
      .catch((error) => {
        setLoading(false);
        showErrorMessage("Something went wrong!");
        console.log(error);
      });
  }

  return (
    <div className="max-w-7xl mx-auto px-5 font-roboto text-textColor">
      <Helmet>
        <title>Register | Tastr</title>
      </Helmet>

      <div className=" w-full max-w-xs md:max-w-sm mx-auto py-20">
        <p className="text-blue-500 text-center text-base">Register</p>
        <h1 className="text-center font-semibold text-3xl mt-4 mb-2">
          Start For Free Today
        </h1>
        <p className="text-gray-500 text-center text-sm">
          Access to all features. No credit card require.
        </p>

        <form
          onSubmit={handelUserRegister}
          className="flex flex-col gap-4 mt-10"
        >
          <div className="form-control">
            <label className="mb-2">
              <span className="label-text text-gray-600">Full Name *</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="name"
              className="input rounded input-bordered"
              required
            />
          </div>
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
              <span className="label-text text-gray-600">Photo URL *</span>
            </label>
            <input
              type="text"
              name="photo"
              placeholder="photo url"
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
              placeholder="********"
              className="input rounded input-bordered"
              required
            />
          </div>
          <div className="form-control mt-5">
            <button className="btn text-primary rounded bg-textColor border-none">
              Submit & Register
            </button>
          </div>
        </form>

        <p className="text-gray-700 text-sm text-center mt-5">
          {`Already have an Account? `}{" "}
          <Link className="text-blue-500 font-medium" to={"/login"}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
