import { useState, useEffect } from "react";
import InfoBoard from "../components/InfoBoard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://vtechshop-be.onrender.com/admin/getOrders",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const resData = await response.json();
      if (response.ok) {
        setOrders(resData.results);
      } else {
        console.log(resData.message);
      }
    };
    // if you are not logged in, navigate to the login page
    if (!isLoggedIn) {
      navigate("/login");
    }
    fetchData();
  }, [isLoggedIn, navigate]);
  return (
    <div>
      <InfoBoard />
      <div className="mt-5 border rounded shadow text-start pt-4 px-3">
        <div className="mb-4">
          <h3>History</h3>
        </div>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">ID User</th>
              <th scope="col">Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Total</th>
              <th scope="col">Delivery</th>
              <th scope="col">Status</th>
              <th scope="col">Detail</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order._id}>
                <td>{order.user._id}</td>
                <td>{order.user.fullName}</td>
                <td>{order.user.phone}</td>
                <td>{order.user.address}</td>
                <td>{order.totalPrice.toLocaleString("vi-VN")} VND</td>
                <td>
                  {order.status === "completed"
                    ? "Delivered successfully"
                    : order.status === "awaiting shipment"
                    ? "Being delivered"
                    : "Waiting for progressing"}
                </td>
                <td>
                  {order.status === "completed"
                    ? "Complete the order"
                    : "Waiting for pay"}
                </td>
                <td>
                  <button className="rounded border-0 bg-success bg-opacity-75 text-white p-2">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
