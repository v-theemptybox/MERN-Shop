import { useDispatch, useSelector } from "react-redux";
import styles from "./HomeProducts.module.css";
import Popup from "./Popup";
import { useState } from "react";

const HomeProducts = ({ homeProducts }) => {
  const [prod, setProd] = useState({});

  const isComponentVisible = useSelector(
    (state) => state.visibility.isComponentVisible
  );
  const dispatch = useDispatch();

  // dispatch SHOW_POPUP action
  const showPopup = () => {
    dispatch({ type: "SHOW_POPUP" });
  };

  // dispatch HIDE_POPUP action
  const hidePopup = () => {
    dispatch({ type: "HIDE_POPUP" });
  };

  const togglePopup = () => {
    if (!isComponentVisible) {
      showPopup();
    } else {
      hidePopup();
    }
  };

  return (
    <div id={styles.homeProducts}>
      <p>MADE THE HARD WAY</p>
      <h3>TOP TRENDING PRODUCTS</h3>
      <div className={styles["grid-products"]}>
        {homeProducts.map((product) => {
          return (
            <div key={product._id.$oid}>
              <img
                src={product.img1}
                alt={product.name}
                width="100%"
                height="100%"
                onClick={() => {
                  togglePopup();
                  setProd(product);
                }}
              />
              <p>
                <strong>{product.name}</strong>
              </p>
              <p>{(+product.price).toLocaleString("vi-VN")} VND</p>
            </div>
          );
        })}
      </div>
      {isComponentVisible && <Popup prod={prod} />}
    </div>
  );
};

export default HomeProducts;
