import React, { useState } from 'react';

const DeliveryAddress = ({ onAddressChange }) => {
  const [address, setAddress] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zip: ''
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
    setSaved(false);
  };

  // 🔍 Check if all fields are filled
  const isFormValid = Object.values(address).every(field => field.trim() !== '');

  const handleSave = () => {
    if (isFormValid) {
      setSaved(true);
      onAddressChange && onAddressChange(address);
      console.log("✅ Address Saved:", address);
    }
  };

  return (
    <div className="card mt-3 shadow">
      <div className="card-body">
        <h5 className="mb-3">📬 Delivery Address</h5>

        <div className="mb-2">
          <label className="form-label">Full Name</label>
          <input type="text" name="name" className="form-control" value={address.name} onChange={handleChange} required />
        </div>

        <div className="mb-2">
          <label className="form-label">Phone Number</label>
          <input type="text" name="phone" className="form-control" value={address.phone} onChange={handleChange} required />
        </div>

        <div className="mb-2">
          <label className="form-label">Street Address</label>
          <input type="text" name="street" className="form-control" value={address.street} onChange={handleChange} required />
        </div>

        <div className="mb-2">
          <label className="form-label">City</label>
          <input type="text" name="city" className="form-control" value={address.city} onChange={handleChange} required />
        </div>

        <div className="mb-2">
          <label className="form-label">State</label>
          <input type="text" name="state" className="form-control" value={address.state} onChange={handleChange} required />
        </div>

        <div className="mb-2">
          <label className="form-label">ZIP Code</label>
          <input type="text" name="zip" className="form-control" value={address.zip} onChange={handleChange} required />
        </div>

        {/* ✅ Save Button - only active when form is valid */}
        <button
          className="btn btn-primary mt-3"
          onClick={handleSave}
          disabled={!isFormValid}
        >
          Save Address
        </button>

        {saved && <div className="text-success mt-2">✅ Address saved successfully!</div>}
      </div>
    </div>
  );
};

export default DeliveryAddress;
