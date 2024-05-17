import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:5000/admin/getOrders?page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const resData = await response.json();
      if (response.ok) {
        setOrders(resData.results);
        setTotalPages(resData.totalPages);
      } else {
        console.log(resData.message);
      }
    };
    fetchData();
  }, [page]);
  return (
    <div>
      <div className="mt-5 border rounded shadow text-start pt-4 px-3">
        <div className="mb-4">
          <h3>History</h3>
        </div>
        <table className="table table-striped">
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
            {orders.map((order) => (
              <tr>
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
        <div className="d-flex justify-content-end">
          <span>
            {page} of {totalPages}
          </span>
          <button
            className={`border-0 bg-white px-2 mx-1 mb-2 ${
              page === 1 ? "text-secondary disabled" : ""
            }`}
            onClick={() => {
              if (page !== 1) {
                setPage(page - 1);
              }
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button
            className={`border-0 bg-white px-2 mx-1 mb-2 ${
              page === totalPages ? "text-secondary disabled" : ""
            }`}
            onClick={() => {
              if (page !== totalPages) {
                setPage(page + 1);
              }
            }}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
