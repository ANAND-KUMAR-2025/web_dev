import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // ✅ Needed for product detail navigation
import { BASE_URL } from '../../api';

const CartItem = ({ item, onRemove, onQuantityChange }) => {
  const [localQty, setLocalQty] = useState(item.quantity);

  const handleUpdateClick = () => {
    if (localQty !== item.quantity && localQty > 0) {
      onQuantityChange(item.id, localQty);
    }
  };

  return (
    <div className="card mb-3 shadow-sm p-3 d-flex flex-row align-items-center">
      {/* ✅ Clickable product image */}
      <Link to={`/products/${item.product.slug}`}>
        <img
          src={`${BASE_URL}${item.product.image}`}
          alt={item.product.name}
          className="rounded border me-4"
          style={{ width: '90px', height: '90px', objectFit: 'cover' }}
        />
      </Link>

      <div className="flex-grow-1">
        {/* ✅ Clickable product name */}
        <h6 className="mb-1">
          <Link
            to={`/products/${item.product.slug}`}
            className="text-decoration-none text-dark"
          >
            {item.product.name}
          </Link>
        </h6>

        <p className="mb-2 text-muted">₹ {item.product.price.toLocaleString()}</p>

        {/* ✅ One-line: Qty + Update + Remove */}
        <div className="d-flex align-items-center gap-2">
          <label className="me-2 fw-bold">Qty:</label>
          <input
            type="number"
            min="1"
            value={localQty}
            onChange={(e) => setLocalQty(parseInt(e.target.value) || 1)}
            className="form-control form-control-sm"
            style={{ width: '70px' }}
          />
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={handleUpdateClick}
            disabled={localQty === item.quantity}
          >
            Update
          </button>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => onRemove(item.id)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
