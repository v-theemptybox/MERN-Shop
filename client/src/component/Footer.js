import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className="my-2 w-100 bg-dark py-5">
      <div className={`${styles["flex-footer"]} container`}>
        <div>
          <h3>CUSTOMER SERVICES</h3>
          <a href="#">Help & Contact Us</a>
          <a href="#">Returns & Refunds</a>
          <a href="#">Online Stores</a>
          <a href="#">Terms & Conditions</a>
        </div>
        <div>
          <h3>COMPANY</h3>
          <a href="#">What We Do</a>
          <a href="#">Available Services</a>
          <a href="#">Latest Posts</a>
          <a href="#">FAQs</a>
        </div>
        <div>
          <h3>SOCIAL MEDIA</h3>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
          <a href="#">Facebook</a>
          <a href="#">Pinterest</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
