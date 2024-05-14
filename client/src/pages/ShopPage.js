import { useEffect, useState } from "react";

import Banner from "../component/Banner";
import ProductList from "../component/ProductList";
import Sidebar from "../component/Sidebar";

const ShopPage = () => {
  const [productList, setProductList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const url = "http://localhost:5000/api/getProducts";

  useEffect(() => {
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
