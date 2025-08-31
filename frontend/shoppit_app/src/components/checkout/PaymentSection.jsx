import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

const PaymentSection = ({ amount = 824.00 }) => {
  const [qrUrl, setQrUrl] = useState('');
  const upiId = "anandkalpanasingh12345@oksbi";
  const name = "WeavumTechnology";

  // ⛑ Ensure amount is a number
  const safeAmount = typeof amount === 'number' ? amount : parseFloat(amount) || 0;

  useEffect(() => {
    const upiUrl = `upi://pay?pa=${upiId}&pn=${name}&am=${safeAmount}&cu=INR`;
    QRCode.toDataURL(upiUrl)
      .then(setQrUrl)
      .catch(err => console.error("Failed to generate QR", err));
  }, [safeAmount]);

  const handleUPIClick = () => {
    const upiUrl = `upi://pay?pa=${upiId}&pn=${name}&am=${safeAmount}&cu=INR`;
    window.open(upiUrl, '_blank');
  };

  return (
    <div className="card shadow p-3">
      <h5 className="mb-3">💳 Payment Options</h5>

      <button className="btn btn-success w-100 mb-3" onClick={handleUPIClick}>
        📲 Pay ₹{safeAmount.toFixed(2)} via UPI App
      </button>

      <div className="text-center border p-3 rounded bg-light">
        <p className="fw-bold mb-2">Scan & Pay via UPI</p>
        {qrUrl ? (
          <img src={qrUrl} alt="UPI QR Code" style={{ width: '200px', borderRadius: '8px' }} />
        ) : (
          <p>Generating QR...</p>
        )}
        <p className="text-muted mt-2 small">
          UPI ID: <strong>{upiId}</strong><br />
          Amount: ₹{safeAmount.toFixed(2)}
        </p>
      </div>

      <hr />
      <button className="btn btn-outline-primary w-100 mb-2">Pay with PayPal</button>
      <button className="btn btn-outline-warning w-100 mb-2">Pay with Flutterwave</button>
      <button className="btn btn-outline-info w-100">Pay with Paystack</button>
    </div>
  );
};

export default PaymentSection;
