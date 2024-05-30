import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { isLoggedIn, loginUser } = useSelector((state) => state.auth);
  const [cartId, setCartId] = useState("");
  const [cartProducts, setCartProducts] = useState([]);

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
          setCartId(resData._id);
          setCartProducts(resData.products);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [isLoggedIn]);

  const getTotalPrice = () => {
    return cartProducts.reduce(
      (total, product) => total + product.totalProduct,
      0
    );
  };

  const handlePlaceOrder = async () => {
    try {
      if (cartProducts && cartProducts.length > 0) {
        const response = await fetch("http://localhost:5000/api/postOrder", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartId,
            status: "pending",
            totalPrice: getTotalPrice(),
          }),
        });

        const resData = await response.json();
        if (response.ok) {
          navigate("/order");
        }
        console.log(resData.message);
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between bg-secondary bg-opacity-10 align-items-center h-100 py-5">
        <h1 className="mb-0 mx-5 py-5 fw-normal fst-italic">CHECKOUT</h1>
        <p className="mb-0 mx-5 py-5 fst-italic">
          HOME / CART / <span className="fw-light">CHECKOUT</span>
        </p>
      </div>
      <div className="fw-light fst-italic my-5">
        <h4 className="fw-normal">BILLING DETAILS</h4>
        <div className="row">
          <div className="col-8 pe-4">
            <form>
              <label className="col-12 mt-3 mb-2 fw-normal">FULL NAME:</label>
              <input
                className="col-12 fw-lighter ps-3 py-2 border"
                type="text"
                placeholder="Enter Your Full Name Here!"
                required
                value={loginUser.fullName || ""}
                readOnly
              />
              <label className="col-12 mt-3 mb-2 fw-normal">EMAIL:</label>
              <input
                className="col-12 fw-lighter ps-3 py-2 border"
                type="email"
                placeholder="Enter Your Email Here!"
                required
                value={loginUser.email || ""}
                readOnly
              />
              <label className="col-12 mt-3 mb-2 fw-normal">
                PHONE NUMBER:
              </label>
              <input
                className="col-12 fw-lighter ps-3 py-2 border"
                type="tel"
                pattern="[0-9]{10}"
                required
                placeholder="Enter Your Phone Number Here!"
                value={loginUser.phone || ""}
                readOnly
              />
              <label className="col-12 mt-3 mb-2 fw-normal">ADDRESS:</label>
              <input
                className="col-12 fw-lighter ps-3 py-2 border"
                type="text"
                placeholder="Enter Your Address Here!"
                required
                value={loginUser.address || ""}
                readOnly
              />
              <button
                type="button"
                className="btn border-0 bg-dark text-light rounded-0 px-4 py-2 mt-3 fst-italic fw-light"
                onClick={handlePlaceOrder}
              >
                Place order
              </button>
            </form>
          </div>
          <div className="col-4 ">
            <div className="bg-secondary bg-opacity-10 px-5 py-5 ">
              <h4 className="mb-4 fw-normal">YOUR ORDER</h4>
              {cartProducts?.map((item) => {
                return (
                  <div
                    key={item.product._id}
                    className="d-flex justify-content-between border-bottom border-secondary-subtle py-2"
                  >
                    <span className="fw-normal">{item.product.name}</span>
                    <span>
                      {parseInt(item.product.price).toLocaleString("vi-VN")}VND
                      x {item.quantity}
                    </span>
                  </div>
                );
              })}
              <div className="d-flex justify-content-between py-2">
                <span className="fw-normal">TOTAL</span>
                <span className="fw-normal fs-5">
                  {getTotalPrice().toLocaleString("vi-VN")} VND
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
