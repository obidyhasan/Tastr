import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import NotFoundLayout from "../layouts/NotFoundLayout";
import Home from "../pages/Home/Home";
import Login from "../auth/Login";
import Register from "../auth/Register";
import MyFoods from "../pages/MyFoods/MyFoods";
import AddFood from "../pages/AddFood/AddFood";
import Gallery from "../pages/Gallery/Gallery";
import MyOrder from "../pages/MyOrder/MyOrder";
import Purchase from "../pages/Purchase/Purchase";
import FoodDetails from "../pages/FoodDetails/FoodDetails";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement: <NotFoundLayout></NotFoundLayout>,
      children: [
        {
          path: "/",
          element: <Home></Home>,
        },
        {
          path: "/login",
          element: <Login></Login>,
        },
        {
          path: "/register",
          element: <Register></Register>,
        },
        {
          path: "/my-foods",
          element: <MyFoods></MyFoods>,
        },
        {
          path: "/add-food",
          element: <AddFood></AddFood>,
        },
        {
          path: "/gallery",
          element: <Gallery></Gallery>,
        },
        {
          path: "/my-orders",
          element: <MyOrder></MyOrder>,
        },
        {
          path: "/purchase/:id",
          element: <Purchase></Purchase>,
        },
        {
          path: "/food-details/:id",
          element: <FoodDetails></FoodDetails>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
};

export default Router;
