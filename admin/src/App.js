import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Root from "./layouts/Root";
import Dashboard from "./pages/Dashboard";
import Order from "./pages/Order";
import Product from "./pages/Product";
import UpdateProduct from "./pages/UpdateProduct";
import User from "./pages/User";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
          index: true,
        },
        {
          path: "orders",
          element: <Order />,
        },
        {
          path: "products",
          element: <Product />,
        },
        {
          path: "create-product",
          element: <UpdateProduct />,
        },
        {
          path: "users",
          element: <User />,
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
