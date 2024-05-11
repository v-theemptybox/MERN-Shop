import { useEffect, useState } from "react";

import Banner from "../component/Banner";
import ProductList from "../component/ProductList";
import Sidebar from "../component/Sidebar";

const ShopPage = () => {
  const [productList, setProductList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const url =
    "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74";
  const fetchData = async () => {
    try {
      const response = await fetch(url);

      const resData = await response.json();
      setProductList(resData);
      setFilteredProducts(resData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // filter products by category function
  const filterProductsByCategory = (category) => {
    // if props(category) === "all"
    if (category === "all") {
      setFilteredProducts(productList);
    } else {
      const filteredProducts = productList.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filteredProducts);
    }
  };

  return (
    <div className="container">
      <Banner />
      <main className="row mt-5">
        <Sidebar filterProductsByCategory={filterProductsByCategory} />
        <ProductList productList={filteredProducts} />
      </main>
    </div>
  );
};

export default ShopPage;
