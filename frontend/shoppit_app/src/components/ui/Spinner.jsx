import React from 'react';
import { ClipLoader } from 'react-spinners';

const Spinner = ({ loading = true, color = '#dc3545', size = 80, message = "Loading..." }) => {
  const override = {
    display: 'block',
    margin: '2rem auto',
    borderColor: color,
  };

  return (
    <div className="text-center my-5">
      <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <p className="text-muted mt-3">{message}</p>
    </div>
  );
};

export default Spinner;
