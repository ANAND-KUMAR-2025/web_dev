import React, { useEffect, useState } from "react";
import RelatedProducts from "./RelatedProducts";
import ProductPagePlaceHolder from "./ProductPagePlaceHolder";
import './ProductPage.css';
import { useParams } from "react-router-dom";
import api from "../../api";
import { BASE_URL } from "../../api";

const ProductPage = ({setNumberCartItems}) => {
  const { slug } = useParams();
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inCart, setInCart] = useState(false);
  const cart_code = localStorage.getItem("cart_code");

  // ✅ Fetch product details
  useEffect(() => {
    setLoading(true);
    api.get(`product_detail/${slug}`)
      .then(res => {
        setProduct(res.data);
        setSimilarProducts(res.data.similar_products);
        setLoading(false);
      })
      .catch(err => {
        console.log(err.message);
        setLoading(false);
      });
  }, [slug]);

  // ✅ Check if product is already in the cart
  useEffect(() => {
    if (product?.id && cart_code) {
      api.get(`product_in_cart?cart_code=${cart_code}&product_id=${product.id}`)
        .then(res => {
          setInCart(res.data.product_in_cart);
        })
        .catch(err => {
          console.error("Error checking if product is in cart:", err.message);
        });
    }
  }, [product?.id, cart_code]);




  // ✅ Add item to cart
  const newItem = async (product) => {
    try {
      const res = await api.post('cart/add/', {
        cart_code,
        product_id: product.id,
      });
      console.log('Item added:', res.data);
      setInCart(true); // ✅ update state so button disables
      setNumberCartItems(curr => curr +1)

    } catch (err) {
      console.error('Add to cart error:', err);
    }
  };

  if (loading || !product) return <ProductPagePlaceHolder />;

  return (
    <div>
      <section className="py-4 bg-light">
        <div className="container px-4 px-lg-5 my-5">
          <div className="row gx-5 align-items-start">
            {/* Product Image */}
            <div className="col-md-6">
              <img
                className="img-fluid rounded shadow-sm zoom-img"
                src={`${BASE_URL}${product.image}`}
                alt="Product"
              />
            </div>

            {/* Product Info */}
            <div className="col-md-6">
              <div className="mb-2 text-muted small">ADDITIVE MANUFACTURING</div>
              <h1 className="fw-bold mb-3">{product.name}</h1>

              <div className="fs-5 mb-4">
                <p className="lead mb-4">{product.description}</p>
                <span className="text-decoration-line-through text-muted me-2">
                  ₹{Math.round(product.price * 1.2)}
                </span>
                <span className="text-success fw-semibold">₹{product.price}</span>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="d-flex align-items-center mb-4">
                <input
                  className="form-control text-center me-3"
                  id="inputQuantity"
                  type="number"
                  defaultValue="1"
                  min="1" // ✅ fix typo
                  style={{ maxWidth: "4rem" }}
                />
                <button
                  className="btn btn-warning shadow-sm fw-semibold"
                  onClick={() => newItem(product)}
                  disabled={inCart}
                >
                  <i className="bi bi-cart-fill me-2"></i>
                  {inCart ? "Product added to Cart" : "Add to Cart"}
                </button>
              </div>

              <p className="text-muted small mb-4">
                Inclusive of all taxes • Free delivery available
              </p>

              {/* About this item */}
              {product.descriptionProduct && (
                <div className="mb-4">
                  <h4 className="fw-bold border-bottom pb-2 mb-3">About this item</h4>
                  <ul>
                    {product.descriptionProduct.map((item, idx) => (
                      <li key={idx}>✅ {item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Product Details */}
      {product.details && (
        <section className="container mb-4">
          <h4 className="fw-bold border-bottom pb-2 mb-3">Product Details</h4>
          <div className="row">
            {Object.entries(product.details).map(([key, val], idx) => (
              <div key={idx} className="col-md-6 mb-2">
                <strong>{key}:</strong> {val}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Products */}
      <RelatedProducts products={similarProducts} />
    </div>
  );
};

export default ProductPage;
