// src/utils/cartCode.js

// Function to generate random cart code
export const generateCartCode = () => {
  return Math.random().toString(36).substring(2, 10); // e.g., 'a1b2c3d4'
};

// Immediately generate a cart code if not present
let cartCode = localStorage.getItem('cart_code');
if (!cartCode) {
  cartCode = generateCartCode();
  localStorage.setItem('cart_code', cartCode);
}

// Export the random cart code value
export const randomvalue = cartCode;
