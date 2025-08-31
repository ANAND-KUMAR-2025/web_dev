import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./components/home/HomePage";
import MainLayout from "./layout/MainLayout";
import NotFoundPage from "./components/ui/NotFoundPage";
import ProductPage from "./components/product/ProductPage";
import api from "./api";

import CartPage from "./components/cart/CartPage";
import CheckoutPage from "./components/checkout/CheckoutPage";
import LoginPage from "./components/user/LoginPage";
import ProtectedRoute from "./components/ui/ProtectedRoute";


const App = () => {

  const [numCartItems, setNumberCartItems] = useState(0);
  const cart_code = localStorage.getItem("cart_code")

  useEffect(() => {
    if (cart_code) {
      api.get(`get_cart_stat?cart_code=${cart_code}`)
        .then(res => {
          console.log(res.data)
          setNumberCartItems(res.data.num_of_items || 0); // ✅ Make sure to update the state
        })
        .catch(err => {
          console.log("Failed to fetch cart stats:", err.message);
        });
    }
  }, [cart_code]);



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout  numCartItems={numCartItems}/>}>
          <Route index element={<HomePage />} />
          <Route path="/products/:slug" element={<ProductPage setNumberCartItems={setNumberCartItems} />} />
          <Route path="cart" element={<CartPage/>} />
          <Route path="*" element={<NotFoundPage/>} />
          <Route path="/checkout" element={
            <ProtectedRoute>
            <CheckoutPage /> 
            </ProtectedRoute>
              
              
          } />
            
            
          <Route path ="/login" element={<LoginPage />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
