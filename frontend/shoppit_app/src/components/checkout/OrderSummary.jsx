import React from 'react';
import styles from './OrderSummary.module.css';

const OrderSummary = ({ subtotal = 0 }) => {
  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  return (
    <div className={`card mt-3 shadow ${styles.card}`}>
      <div className="card-body">
        <div className="d-flex justify-content-between mb-2">
          <span>Subtotal:</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>GST (18%):</span>
          <span>₹{gst.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between fw-bold mb-3">
          <span>Total:</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
        <button className="btn btn-primary w-100" disabled={subtotal === 0}>
          Total Amount=₹{total.toFixed(2)}
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
