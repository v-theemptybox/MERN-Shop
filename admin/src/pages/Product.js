import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:5000/admin/getProducts?page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const resData = await response.json();
      if (response.ok) {
        setProducts(resData.results);
        setTotalPages(resData.totalPages);
      } else {
        console.log(resData.message);
      }
    };
    fetchData();
  }, [page]);

  return (
    <>
      <div className="mt-5 border rounded shadow text-start pt-4 px-3">
        <div className="mb-4">
          <h3>Products</h3>
        </div>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Image</th>
              <th scope="col">Category</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{(+product.price).toLocaleString("vi-VN")} VND</td>
                <td style={{ width: "1%", whiteSpace: "nowrap" }}>
                  <img
                    src={product.img1}
                    alt={product.name}
                    className="w-100"
                  />
                </td>
                <td>{product.category}</td>

                <td>
                  <button className="rounded border-0 bg-success bg-opacity-75 text-white p-2 me-2">
                    Update
                  </button>
                  <button className="rounded border-0 bg-danger bg-opacity-75 text-white p-2">
                    Delete
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
    </>
  );
};

export default Product;
