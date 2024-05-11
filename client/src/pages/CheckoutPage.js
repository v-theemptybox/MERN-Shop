import { useSelector } from "react-redux";

const CheckoutPage = () => {
  const listCart = useSelector((state) => state.cart.listCart);

  const getTotalPrice = () => {
    let totalPrice = 0;
    listCart.forEach((product) => {
      totalPrice += product.price * product.amount;
    });
    return totalPrice.toLocaleString("vi-VN");
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
              />
              <label className="col-12 mt-3 mb-2 fw-normal">EMAIL:</label>
              <input
                className="col-12 fw-lighter ps-3 py-2 border"
                type="email"
                placeholder="Enter Your Email Here!"
                required
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
              />
              <label className="col-12 mt-3 mb-2 fw-normal">ADDRESS:</label>
              <input
                className="col-12 fw-lighter ps-3 py-2 border"
                type="text"
                placeholder="Enter Your Address Here!"
                required
              />
              <button className="btn border-0 bg-dark text-light rounded-0 px-4 py-2 mt-3 fst-italic fw-light">
                Place order
              </button>
            </form>
          </div>
          <div className="col-4 ">
            <div className="bg-secondary bg-opacity-10 px-5 py-5 ">
              <h4 className="mb-4 fw-normal">YOUR ORDER</h4>
              {listCart.map((product) => {
                return (
                  <div
                    key={product._id.$oid}
                    className="d-flex justify-content-between border-bottom border-secondary-subtle py-2"
                  >
                    <span className="fw-normal">{product.name}</span>
                    <span>
                      {parseInt(product.price).toLocaleString("vi-VN")}VND x{" "}
                      {product.amount}
                    </span>
                  </div>
                );
              })}
              <div className="d-flex justify-content-between py-2">
                <span className="fw-normal">TOTAL</span>
                <span className="fw-normal fs-5">{getTotalPrice()} VND</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
