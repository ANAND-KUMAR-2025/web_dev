import React from "react";
import { Link } from "react-router-dom";
import styles from "./HomeCard.module.css";

const HomeCard = ({ product }) => {
  const BASE_URL = "http://127.0.0.1:8000";

  return (
    <Link to={`/products/${product.slug}`} className={styles.link}>
      <div className="card p-3 shadow-sm border-0 h-100"> {/* 👈 Bootstrap Card */}
        {/* 🖼️ Product Image */}
        <img
          src={`${BASE_URL}${product.image}`}
          alt={product.name}
          className="card-img-top rounded"
          style={{ height: "300px", objectFit: "cover" }}
        />

        {/* 📦 Product Info */}
        <div className="card-body text-center">
          <h6 className="card-title mb-2">{product.name}</h6>
          <p className="text-primary fw-bold">
            ₹{!isNaN(product.price) ? parseFloat(product.price).toFixed(2) : "0.00"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default HomeCard;
