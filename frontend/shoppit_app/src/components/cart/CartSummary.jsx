import React from 'react';
import { Link } from 'react-router-dom';

const CartSummary = ({ subtotal = 0 }) => {
  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  return (
    <div className="p-4 border rounded shadow-sm bg-light">
      <h5 className="mb-4 text-center">Order Summary</h5>

      <div className="d-flex justify-content-between mb-2">
        <span>Subtotal:</span>
        <span>₹{subtotal.toFixed(2)}</span>
      </div>

      <div className="d-flex justify-content-between mb-2">
        <span>GST (18%):</span>
        <span>₹{gst.toFixed(2)}</span>
      </div>

      <hr />

      <div className="d-flex justify-content-between fw-bold mb-3">
        <span>Total:</span>
        <span>₹{total.toFixed(2)}</span>
      </div>

      <Link to="/checkout">
        <button className="btn btn-primary w-100" disabled={subtotal === 0}>
          Proceed to Checkout
        </button>
      </Link>
    </div>
  );
};

export default CartSummary;
