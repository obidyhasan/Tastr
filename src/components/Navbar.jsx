import { Link, NavLink, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { user, userLogout } = useAuth();
  const active = `underline font-medium`;
  const location = useLocation();

  const [headerStyle, setHeaderStyle] = useState({
    backgroundColor: "transparent",
    transition: "background-color 0.3s ease",
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        // Change style when scrolled down 50px or more
        setHeaderStyle({
          backgroundColor: "rgb(17, 17, 17, .80)", // Example color
          transition: "background-color 0.3s ease",
        });
      } else {
        // Reset style when at the top
        setHeaderStyle({
          backgroundColor: "transparent",
          transition: "background-color 0.3s ease",
        });
      }
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup the listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = (
    <div className="flex gap-3 lg:gap-5 text-base flex-col lg:flex-row">
      <NavLink
        className={({ isActive }) =>
          isActive ? `${active}` : `hover:underline`
        }
        to={"/"}
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${active}` : `hover:underline`
        }
        to={"/all-foods"}
      >
        All Foods
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${active}` : `hover:underline`
        }
        to={"/gallery"}
      >
        Gallery
      </NavLink>
    </div>
  );

  const privateLinks = (
    <div className="flex gap-3 text-base flex-col ">
      <NavLink
        className={({ isActive }) =>
          isActive ? `${active}` : `hover:underline`
        }
        to={"/my-foods"}
      >
        My Foods
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${active}` : `hover:underline`
        }
        to={"/add-food"}
      >
        Add Food
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${active}` : `hover:underline`
        }
        to={"/my-orders"}
      >
        My Orders
      </NavLink>
    </div>
  );

  return (
    <div
      style={location.pathname === "/" ? headerStyle : { backgroundColor: "" }}
      className={`sticky top-0 z-10 ${
        location.pathname === "/" ? "" : "bg-base-100"
      }`}
    >
      <div className="max-width mx-auto px-5 py-[3px]">
        <div className="navbar px-0 flex justify-between ">
          <div className="">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className={`btn btn-ghost mr-4 lg:hidden ${
                  location.pathname === "/" ? "border-white" : "bg-base-200"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-4 shadow text-black"
              >
                {navLinks}
              </ul>
            </div>
            <Link to={"/"} className="text-4xl font-oswald font-bold">
              Tastr
            </Link>
          </div>
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navLinks}</ul>
          </div>
          <div className="">
            {user ? (
              <div className="flex gap-2 items-center">
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle flex items-center avatar"
                  >
                    <div className="w-11 h-11 border rounded-full">
                      <img alt="" src={user?.photoURL} />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-4 shadow text-black"
                  >
                    {privateLinks}
                  </ul>
                </div>
                <button
                  onClick={userLogout}
                  className={`btn ${
                    location.pathname === "/"
                      ? "btn-outline text-white hover:border-white hover:bg-white hover:text-black"
                      : ""
                  }`}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to={"/login"}
                className={`btn ${
                  location.pathname === "/"
                    ? "btn-outline text-white hover:border-white hover:bg-white hover:text-black"
                    : ""
                }`}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
