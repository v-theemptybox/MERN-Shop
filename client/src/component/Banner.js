import { useNavigate } from "react-router-dom";
import styles from "./Banner.module.css";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div id={styles.banner} className="py-5 ps-5">
      <div className={`${styles["flex-left"]}`}>
        <p>NEW INSPIRATION 2024</p>
        <h2>20% OFF ON NEW SEASON</h2>
        <button
          type="button"
          className="btn btn-dark"
          onClick={() => {
            navigate("/shop");
          }}
        >
          Browse collections
        </button>
      </div>
      <div className="pe-2">
        <img src="./img-asm03/banner1.jpg" alt="banner1" width="100%" />
      </div>
    </div>
  );
};

export default Banner;
