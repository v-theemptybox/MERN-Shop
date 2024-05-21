import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Root from "./layouts/Root";
import Dashboard from "./pages/Dashboard";
import Order from "./pages/Order";
import Product from "./pages/Product";
import UpdateProduct from "./pages/UpdateProduct";
import User from "./pages/User";
import CustomerSupport from "./pages/CustomerSupport";
import Register from "./pages/Register";
import Login from "./pages/Login";

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
        {
          path: "customer-support",
          element: <CustomerSupport />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <div className="App">
        <RouterProvider router={router}></RouterProvider>
      </div>
    </Provider>
  );
}

export default App;
