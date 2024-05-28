import { useState, useEffect, useCallback } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  faCaretLeft,
  faCaretRight,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./DetailPage.module.css";
import { useDispatch, useSelector } from "react-redux";
const DetailPage = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [amount, setAmount] = useState(1);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { isLoggedIn, loginUser } = useSelector((state) => state.auth);

  const showAlertMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  // use useLocation() to get state pass through <Link> in react-router
  const location = useLocation();
  const product = location.state;

  const url = "http://localhost:5000/api/getProducts";

  const fetchData = useCallback(async () => {
    const response = await fetch(url);

    const resData = await response.json();
    // get related product by category
    const filteredData = resData.filter(
      (prod) => prod._id !== product._id && prod.category === product.category
    );

    setRelatedProducts(filteredData);
  }, [product.category, product._id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // change quantity of product
  const increaseAmount = () => {
    setAmount(amount + 1);
  };
  const decreaseAmount = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    } else {
      alert("Quantity must be greater than 0!");
    }
  };

  // add logic for button "Add to cart"
  const handleAddToCart = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/updateCart", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: loginUser._id,
          products: [
            {
              product: product._id,
              quantity: amount,
              totalProduct: amount * product.price,
            },
          ],
        }),
      });

      const resData = await response.json();

      if (response.ok) {
        console.log(resData);
      } else {
        showAlertMessage(resData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container fst-italic fw-light">
      {message && (
        <div className="position-absolute start-0 border border-1 border-primary p-2 text-primary">
          <FontAwesomeIcon icon={faInfoCircle} />
          &nbsp;
          {message}
        </div>
      )}
      <div className="row mt-5">
        <div className="col-1">
          <img src={product.img1} alt={product.name} className="w-100 mt-2" />
          <img src={product.img2} alt={product.name} className="w-100 mt-2" />
          <img src={product.img3} alt={product.name} className="w-100 mt-2" />
          <img src={product.img4} alt={product.name} className="w-100 mt-2" />
        </div>
        <div className="col-4">
          <img src={product.img4} alt={product.name} className="w-100" />
        </div>
        <div className="col-7">
          <h2>{product.name}</h2>
          <h4>{(+product.price).toLocaleString("vi-VN")} VND</h4>
          <p>{product.short_desc}</p>
          <p>
            <strong>CATEGORY: </strong>
            {product.category}
          </p>
          <div className="d-flex">
            <div className="border d-flex justify-content-between align-items-center">
              <label htmlFor="quantityProd" className="ps-2">
                QUANTITY
              </label>
              <div className="w-50 text-end">
                <button className="btn" onClick={decreaseAmount}>
                  <FontAwesomeIcon icon={faCaretLeft} />
                </button>
                <input
                  id={styles.quantityProd}
                  className="w-25 border-0 text-center"
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(+e.target.value)}
                  type="number"
                />
                <button className="btn" onClick={increaseAmount}>
                  <FontAwesomeIcon icon={faCaretRight} />
                </button>
              </div>
            </div>
            <button
              className="btn bg-black text-light rounded-0 fst-italic"
              onClick={() => {
                // if (isLoggedIn) {
                handleAddToCart();
                // } else {
                //   navigate("/login");
                // }
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <div className="row mt-5 mb-3">
        <div className="col-12">
          <h2>
            <span className="badge bg-black rounded-0">DESCRIPTION</span>
          </h2>
          <h3>PRODUCT DESCRIPTION</h3>
          <p>{product.long_desc}</p>
        </div>
      </div>
      <div className="row">
        <h3 className="col-12">RELATED PRODUCTS</h3>

        {relatedProducts.map((prod) => {
          return (
            <div key={prod._id} className="col-3 text-center">
              <Link to={`/detail/${prod._id}`} state={prod}>
                <img src={prod.img1} alt={prod.name} className="w-100" />
              </Link>
              <p className="fw-medium">{prod.name}</p>
              <p>{(+prod.price).toLocaleString("vi-VN")} VND</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetailPage;
