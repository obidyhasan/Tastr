import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import NotFoundLayout from "../layouts/NotFoundLayout";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement: <NotFoundLayout></NotFoundLayout>,
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
};

export default Router;
