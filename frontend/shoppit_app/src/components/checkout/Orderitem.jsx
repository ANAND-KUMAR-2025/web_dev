import React from "react";
import { BASE_URL } from "../../api";

const OrderItem = ({ item }) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
      {/* 📦 Product Image & Name */}
      <div className="d-flex align-items-center">
        <img
          src={`${BASE_URL}${item.product.image}`}
          alt={item.product.name}
          className="img-fluid"
          style={{
            width: "60px",
            height: "60px",
            objectFit: "cover",
            borderRadius: "5px",
            border: "1px solid #ddd"
          }}
        />
        <div className="ms-3">
          <h6 className="mb-0">{item.product.name}</h6>
          <small className="text-muted">Quantity: {item.quantity}</small>
        </div>
      </div>

      {/* Price */}
      <div>
        <h6 className="mb-0">₹ {item.total_price.toFixed(2)}</h6>
      </div>
    </div>
  );
};

export default OrderItem;
