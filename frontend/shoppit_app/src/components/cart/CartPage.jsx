import React, { useEffect, useState } from 'react';
import CartItem from './Cartitem';
import CartSummary from './CartSummary';
import api from '../../api';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from '../ui/Spinner';


const CartPage = () => {
  const cart_code = localStorage.getItem("cart_code");
  const [CartItems, setCartItems] = useState([]);
  const subtotal = CartItems.reduce((acc, item) => acc + item.total_price, 0);
  const [loading,setloading]=useState(false)


  useEffect(() => {
    if (cart_code) {
      setloading(true)
      api.get(`get_cart_stat?cart_code=${cart_code}`)
        .then(res => {
          setCartItems(res.data.items);
          setloading(false)
        })
        .catch(err => {
          console.log("Failed to fetch cart stats:", err.message);
          setloading(false)
        });
    }
  }, []);

  const handleRemove = (itemId) => {
    api.delete(`cart/item/delete/${itemId}/`)
      .then(() => {
        setCartItems(prev => prev.filter(item => item.id !== itemId));
      });
  };

 const handleQuantityChange = (itemId, newQty) => {
  api.patch(`cart/update/${itemId}/`, { quantity: newQty })
    .then(res => {
      const updatedItem = res.data;  // get full updated item from server
      setCartItems(prev =>
        prev.map(item =>
          item.id === itemId ? updatedItem : item
        )
      );
    })
    .catch(err => console.error("Failed to update quantity:", err));
};

if (loading) {
  return <Spinner loading={loading} />
}

if (CartItems.length < 1) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5">
      <img
        src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
        alt="Empty Cart"
        width="100"
        className="mb-4"
      />
      <h4 className="text-muted">🛒 Your cart is empty!</h4>
      <p className="text-secondary">Looks like you haven’t added anything yet.</p>
      <a href="/" className="btn btn-outline-primary mt-3">
        Browse Products
      </a>
    </div>
  );
}


  return (
    <div className="container my-3 py-3" style={{ height: "80vh", overflow: "scroll" }}>
      <h5 className='mb-4'>Shopping Cart</h5>
      <div className='row'>
        <div className='col-md-8'>
          {CartItems.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={handleRemove}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </div>
        <div className='col-md-4'>
          <CartSummary  subtotal={subtotal} />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
