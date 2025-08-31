import React, { useEffect, useState } from 'react';
import Header from './Header';
import CardContainer from './CardContainer';
import api from '../../api'; // ✅ Make sure this path is correct
import PlaceHolderContainer from '../ui/PlaceHolderContainer';
import Error from '../ui/Error';
import { randomvalue } from '../../GenerateCartCode';



const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");




  useEffect(() => {
      if (localStorage.getItem("cart_code") === null) {
        localStorage.setItem("cart_code", randomvalue);
        }
    }, []);


  useEffect(() => {
    setLoading(true);
    api.get("products")
      .then(res => {
        console.log(res.data);
        setProducts(res.data);
        setLoading(false);
        setError(""); // ✅ clear error if successful
      })
      .catch(err => {
        console.error("API Error:", err.message);
        setError(err.message);
        setLoading(false); // ✅ stop loading even on error
      });
  }, []);

  return (
    <>
      <Header />
      {loading ? (
        <PlaceHolderContainer />
      ) : error ? (
        <p className="text-danger text-center py-5">{error}</p>
      ) : (
        <CardContainer products={products} />
      )}
    </>
  );
};

export default HomePage;
