import React, { useEffect, useState } from 'react';
import OrderItem from './Orderitem';
import OrderSummary from './OrderSummary';
import PaymentSection from './PaymentSection';
import DeliveryAddress from './DeliveryAddress';
import api from '../../api';
import Spinner from '../ui/Spinner';

const CheckoutPage = () => {
  const cart_code = localStorage.getItem("cart_code");
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cart_code) {
      api.get(`get_cart_stat?cart_code=${cart_code}`)
        .then(res => {
          setCartItems(res.data.items || []);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching cart:", err);
          setLoading(false);
        });
    }
  }, [cart_code]);

  const subtotal = cartItems.reduce((acc, item) => acc + item.total_price, 0);
  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  if (loading) return <Spinner loading={true} />;

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-center text-primary">
        🧾 Checkout Overview
      </h2>

      <div className="row g-4">
        {/* LEFT SIDE: Cart Items, Address, Summary */}
        <div className="col-lg-8">
          {/*  Cart Items */}
          <div className="card shadow-sm rounded-4 mb-4 border-0">
            <div className="card-header bg-primary text-white rounded-top-4 fw-semibold">
              <i className="bi bi-cart-check me-2"></i> Your Cart Items
            </div>
            <div className="card-body bg-light" style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {cartItems.length > 0 ? (
                cartItems.map((item) => <OrderItem key={item.id} item={item} />)
              ) : (
                <p className="text-muted">Your cart is empty.</p>
              )}
            </div>
          </div>

          {/*  Delivery Address */}
          <div className="card shadow-sm rounded-4 mb-4 border-0">
            <div className="card-header bg-info text-white rounded-top-4 fw-semibold">
              <i className="bi bi-geo-alt-fill me-2"></i> Delivery Address
            </div>
            <div className="card-body bg-white">
              <DeliveryAddress />
            </div>
          </div>

          {/*  Order Summary */}
          <OrderSummary subtotal={subtotal} />
        </div>

        {/* RIGHT SIDE: Payments */}
        <div className="col-lg-4">
          <div className="sticky-top" style={{ top: '80px' }}>
            <PaymentSection amount={total.toFixed(2)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
