import { useDispatch } from "react-redux";

import styles from "./Popup.module.css";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const Popup = ({ prod }) => {
  const dispatch = useDispatch();

  const hidePopup = () => {
    dispatch({ type: "HIDE_POPUP" });
  };

  return (
    <>
      <div className={styles.darkBG} onClick={() => hidePopup()} />
      <div className={styles.centered}>
        <div className={`${styles.modal} w-100 h-100`}>
          <div className={styles.modalContent}>
            <img src={prod.img1} alt="img" className="w-50" />
            <div>
              <h3 className="fw-medium">{prod.name}</h3>
              <h4 className="fw-normal">
                {(+prod.price).toLocaleString("vi-VN")} VND
              </h4>
              <p className="fw-light">{prod.short_desc}</p>
              <Link
                to={`/detail/${prod._id.$oid}`}
                state={prod}
                className="btn btn-dark px-5 mt-3 rounded-0"
                // if don't hidePopup() when returning HomePage from DetailPage then isComponentVisible is true
                // then can't reading undefined product cause have not clicked on the product yet
                onClick={() => hidePopup()}
              >
                <FontAwesomeIcon icon={faCartShopping} /> View Detail
              </Link>
            </div>
            <button
              className="align-self-start border-0 bg-white"
              onClick={() => hidePopup()}
            >
              &#10006;
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup;
