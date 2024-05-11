import React from "react";
import styles from "./NewsSubscription.module.css";

const NewsSubscription = () => {
  return (
    <div>
      <div className="text-center my-5">
        <div className={`${styles["bg-color"]} row py-5 fst-italic`}>
          <div className="col">
            <h3 className="fw-normal">FREE SHIPPING</h3>
            <p>Free shipping worldwide</p>
          </div>
          <div className="col">
            <h3 className="fw-normal">24 X 7 SERVICE</h3>
            <p>Free shipping worldwide</p>
          </div>
          <div className="col">
            <h3 className="fw-normal">FESTIVAL OFFER</h3>
            <p>Free shipping worldwide</p>
          </div>
        </div>
      </div>

      <div>
        <div className="row py-5">
          <div className="col fst-italic">
            <h3 className="fw-normal">LET'S BE FRIENDS</h3>
            <p>Nisi nisi tempor consequat laboris nisi.</p>
          </div>
          <div className="col text-end">
            <input
              className="ps-2 pe-4 py-3 col-8"
              type="search"
              placeholder="Enter your email address"
            />
            <button
              type="button"
              className={`btn  ${styles["subs-btn"]} btn-dark py-3 border border-dark border-2`}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsSubscription;
