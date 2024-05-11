import styles from "./ProductCategories.module.css";

const ProductCategories = () => {
  return (
    <div id={styles.homeCategories}>
      <p>CAREFULLY CREATED COLLECTIONS</p>
      <h3>BROWSE OUR CATEGORIES</h3>
      <div>
        <div className={styles["flex-categories"]}>
          <img src="./img-asm03/product_1.png" alt="product_1" width="100%" />
          <img src="./img-asm03/product_2.png" alt="product_2" width="100%" />
        </div>
        <div className={styles["flex-categories"]}>
          <img src="./img-asm03/product_3.png" alt="product_3" width="100%" />
          <img src="./img-asm03/product_4.png" alt="product_4" width="100%" />
          <img src="./img-asm03/product_5.png" alt="product_5" width="100%" />
        </div>
      </div>
    </div>
  );
};

export default ProductCategories;
