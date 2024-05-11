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

const CartPage = () => {
  const users = JSON.parse(localStorage.getItem("users")) ?? [];
  const cart = JSON.parse(localStorage.getItem("cart")) ?? [];
  const loginUser = JSON.parse(localStorage.getItem("loginUser")) ?? {};

  let listCart = useSelector((state) => state.cart.listCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // sum(total price) of listCart
  const getTotalPrice = () => {
    let totalPrice = 0;
    listCart.forEach((product) => {
      totalPrice += product.price * product.amount;
    });
    return totalPrice.toLocaleString("vi-VN");
  };

  // add new cart list to user cart
  const updatedUsers = users.map((user) => {
    if (user.email === loginUser.email) {
      return { ...user, userCart: cart };
    }
    return user;
  });
  localStorage.setItem("users", JSON.stringify(updatedUsers));

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
                {listCart.map((product) => {
                  return (
                    <tr key={product._id.$oid} className="text-center">
                      <td className="w-25">
                        <img
                          src={product.img1}
                          alt={product.name}
                          className="w-50"
                        />
                      </td>

                      <td className="fw-medium">{product.name} </td>
                      <td>{(+product.price).toLocaleString("vi-VN")} VND</td>
                      <td>
                        <button
                          className="btn"
                          onClick={() => {
                            if (+product.amount === 1) {
                              alert(
                                "Quantity must be greater than 0!\nIf you don't buy this product anymore, please delete it"
                              );
                            }
                            dispatch({
                              type: "UPDATE_CART",
                              payload: {
                                ...product,
                                amount: +Math.max(1, product.amount - 1),
                              },
                            });
                          }}
                        >
                          <FontAwesomeIcon icon={faCaretLeft} />
                        </button>
                        <input
                          id={styles.quantityProd}
                          className="w-25 border-0 text-center"
                          min="1"
                          value={product.amount}
                          onChange={(e) => {
                            parseInt(e.target.value);
                          }}
                          onBlur={(e) => {
                            if (+e.target.value === 0) {
                              e.target.value = 1;
                            }
                            dispatch({
                              type: "UPDATE_CART",
                              payload: {
                                ...product,
                                amount: +e.target.value,
                              },
                            });
                          }}
                          type="number"
                        />
                        <button
                          className="btn"
                          onClick={() => {
                            dispatch({
                              type: "UPDATE_CART",
                              payload: {
                                ...product,
                                amount: +product.amount + 1,
                              },
                            });
                          }}
                        >
                          <FontAwesomeIcon icon={faCaretRight} />
                        </button>
                      </td>
                      <td>
                        {(product.price * product.amount).toLocaleString(
                          "vi-VN"
                        )}{" "}
                        VND
                      </td>
                      <td>
                        <button
                          className="border-0 w-100 bg-white"
                          onClick={() => {
                            dispatch({
                              type: "DELETE_CART",
                              payload: product._id.$oid,
                            });
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
