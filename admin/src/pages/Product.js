import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [updateView, setUpdateView] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:5000/admin/getProducts?page=${page}`,
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
        setProducts(resData.results);
        setTotalPages(resData.totalPages);
      } else {
        console.log(resData.message);
      }
    };
    fetchData();
  }, [page, updateView]);

  const handleDeleteProduct = async (productId) => {
    try {
      console.log(productId);
      const response = await fetch(
        "http://localhost:5000/admin/deleteProduct",
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId,
          }),
        }
      );

      const resData = await response.json();
      console.log(resData.message);
      setUpdateView((prevState) => !prevState);
    } catch (error) {
      console.log(error);
    }
  };

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
                  <button
                    className="rounded border-0 bg-success bg-opacity-75 text-white p-2 me-2"
                    onClick={() => {
                      navigate(`${product._id}`);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="rounded border-0 bg-danger bg-opacity-75 text-white p-2"
                    onClick={() => {
                      handleDeleteProduct(product._id);
                    }}
                  >
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
