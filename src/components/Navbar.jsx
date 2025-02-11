import { Link, NavLink, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import useTheme from "../hooks/useTheme";

const Navbar = () => {
  const { user, userLogout } = useAuth();
  const active = `underline font-medium`;
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

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
      <button className="btn btn-sm" onClick={toggleTheme}>
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </button>
    </div>
  );

  return (
    <div
      style={location.pathname === "/" ? headerStyle : { backgroundColor: "" }}
      className={`sticky top-0 z-20 ${
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
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-4 shadow text-primary"
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
          <div className="space-x-2">
            <div>
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
                      className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-4 shadow text-primary"
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
                <div className="flex gap-2">
                  <div
                    onClick={toggleTheme}
                    className="flex items-center justify-center cursor-pointer"
                  >
                    {theme === "light" ? (
                      <svg
                        className="swap-on h-8 w-8 fill-current transform"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                      </svg>
                    ) : (
                      <svg
                        className="swap-off h-8 w-8 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                      </svg>
                    )}
                  </div>
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
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
