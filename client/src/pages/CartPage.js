import { useDispatch, useSelector } from "react-redux";
import {
  faTrashCan,
  faCaretLeft,
  faCaretRight,
  faArrowLeft,
  faArrowRight,
  faGift,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./DetailPage.module.css";
import Banner from "../component/Banner";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const CartPage = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [updateView, setUpdateView] = useState(false);

  const { isLoggedIn, loginUser } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isLoggedIn) {
          const response = await fetch("http://localhost:5000/api/getCart", {
            method: "GET",
            credentials: "include",
          });

          const resData = await response.json();
          setCartProducts(resData.products);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [isLoggedIn, updateView]);

  const handleRemoveProduct = async (productId) => {
    try {
      if (isLoggedIn) {
        const response = await fetch(
          "http://localhost:5000/api/removeFromCart",
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user: loginUser._id,
              productId,
            }),
          }
        );

        const resData = await response.json();
        setCartProducts(resData.cart.products);
        setUpdateView((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // sum(total price) of cart
  const getTotalPrice = () => {
    return cartProducts
      .reduce((total, product) => total + product.totalProduct, 0)
      .toLocaleString("vi-VN");
  };

  const handleUpdateCart = async (productId, amount, productPrice) => {
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
              product: productId,
              quantity: amount,
              totalProduct: amount * +productPrice,
            },
          ],
        }),
      });

      const resData = await response.json();
      setUpdateView((prev) => !prev);
      return resData;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <Banner />
      <div className="fw-light fst-italic my-5">
        <h4 className="fw-normal">SHOPPING CART</h4>
        <div className="d-flex">
          <div className="col-8">
            <table className="table table-borderless">
              <thead>
                <tr className="text-center">
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
                    PRODUCT
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
                  <th
                    className="fw-medium bg-secondary bg-opacity-10 py-3 px-3"
                    scope="col"
                  >
                    TOTAL
                  </th>
                  <th
                    className="fw-medium bg-secondary bg-opacity-10 py-3 px-3"
                    scope="col"
                  >
                    REMOVE
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartProducts?.map((item) => {
                  return (
                    <tr key={item.product._id} className="text-center">
                      <td className="w-25">
                        <img
                          src={item.product.img1}
                          alt={item.product.name}
                          className="w-50"
                        />
                      </td>

                      <td className="fw-medium">{item.product.name} </td>
                      <td>
                        {(+item.product.price).toLocaleString("vi-VN")} VND
                      </td>
                      <td>
                        <button
                          className="btn"
                          onClick={() => {
                            if (item.quantity === 1) {
                              alert(
                                "Quantity must be greater than 0!\nIf you don't buy this product anymore, please delete it"
                              );
                            } else {
                              handleUpdateCart(
                                item.product._id,
                                -1,
                                item.product.price
                              );
                            }
                          }}
                        >
                          <FontAwesomeIcon icon={faCaretLeft} />
                        </button>
                        <input
                          id={styles.quantityProd}
                          className="w-25 border-0 text-center"
                          min="1"
                          value={item.quantity}
                          readOnly
                          onChange={(e) => {
                            setCartProducts(
                              cartProducts.map((p) =>
                                p.product._id === item.product._id
                                  ? { ...p, quantity: parseInt(e.target.value) }
                                  : p
                              )
                            );
                          }}
                          type="number"
                        />
                        <button
                          className="btn"
                          onClick={() => {
                            handleUpdateCart(
                              item.product._id,
                              1,
                              item.product.price
                            );
                          }}
                        >
                          <FontAwesomeIcon icon={faCaretRight} />
                        </button>
                      </td>
                      <td>{item.totalProduct.toLocaleString("vi-VN")} VND</td>
                      <td>
                        <button
                          className="border-0 w-100 bg-white"
                          onClick={() => {
                            handleRemoveProduct(item.product._id);
                          }}
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="col d-flex justify-content-end">
            <div className="w-75 bg-secondary bg-opacity-10 text-start  py-5 px-5 mr-0">
              <h4 className="mb-4 fw-normal">CART TOTAL</h4>
              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-normal">SUBTOTAL</span>
                <span>{getTotalPrice()} VND</span>
              </div>
              <div className="d-flex justify-content-between border-top align-items-center">
                <span className="fw-normal">TOTAL</span>
                <span className="fw-normal fs-5">{getTotalPrice()} VND</span>
              </div>
              <input
                type="text"
                placeholder="Enter your coupon"
                className="w-100 py-2 px-2 border mt-4"
              />

              <button
                type="button"
                className="w-100 border-0 py-2 bg-black text-light "
              >
                <FontAwesomeIcon icon={faGift} /> Apply coupon
              </button>
            </div>
          </div>
        </div>

        <div className="bg-secondary bg-opacity-10 col-8 d-flex justify-content-between">
          <button
            className="border-0 mx-4 my-4 py-2 px-2"
            onClick={() => {
              navigate("/shop");
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Continue shopping
          </button>
          <button
            className="border-1 mx-4 my-4 py-2 px-2"
            onClick={() => {
              navigate("/checkout");
            }}
          >
            Proceed to checkout <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
