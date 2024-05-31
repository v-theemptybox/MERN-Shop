import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://vtechshop-be.onrender.com/api/getOrder/${orderId}`,
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
          setOrder(resData);
          return resData;
        } else {
          console.log(resData.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [orderId]);
  return (
    <div className="container my-3">
      <h2>INFORMATION ORDER</h2>
      <div className="mt-3 mb-5 text-secondary">
        <p>ID User: {order?.user._id}</p>
        <p>Full Name: {order?.user.fullName}</p>
        <p>Phone: {order?.user.phone}</p>
        <p>Address: {order?.user.address}</p>
        <p>Total: {order?.totalPrice?.toLocaleString("vi-VN")} VND</p>
      </div>
      <div className="col-12">
        <table className="table table-borderless">
          <thead>
            <tr className="text-center">
              <th
                className="fw-medium bg-secondary bg-opacity-10 py-3 px-3"
                scope="col"
              >
                ID PRODUCT
              </th>
              <th
                className="fw-medium bg-secondary bg-opacity-10 py-3 px-3"
                scope="col"
              >
                IMAGE
              </th>
              <th
                className="fw-medium bg-secondary bg-opacity-10 py-3 px-3"
                scope="col"
              >
                NAME
              </th>
              <th
                className="fw-medium bg-secondary bg-opacity-10 py-3 px-3"
                scope="col"
              >
                PRICE
              </th>
              <th
                className="fw-medium bg-secondary bg-opacity-10 py-3 px-3"
                scope="col"
              >
                QUANTITY
              </th>
            </tr>
          </thead>
          <tbody>
            {order?.products.map((item) => {
              return (
                <tr key={item._id} className="text-center">
                  <td>{item.product._id}</td>
                  <td>
                    <img
                      src={item.product.img1}
                      alt={item.product.name}
                      className="w-25"
                    />
                  </td>
                  <td>{item.product.name}</td>
                  <td>{(+item.product.price)?.toLocaleString("vi-VN")} VND</td>
                  <td>{item.quantity}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetail;
