import { useEffect, useState } from "react";
import Banner from "../component/Banner";
import HomeProducts from "../component/HomeProducts";
import ProductCategories from "../component/ProductCategories";
import NewsSubscription from "../component/NewsSubscription";

const HomePage = () => {
  const [homeProducts, setHomeProducts] = useState([]);
  const url =
    "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74";
  const fetchData = async () => {
    try {
      const response = await fetch(url);

      const resData = await response.json();

      setHomeProducts(resData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <Banner />
      <ProductCategories />
      <HomeProducts homeProducts={homeProducts} />
      <NewsSubscription />
    </div>
  );
};

export default HomePage;
