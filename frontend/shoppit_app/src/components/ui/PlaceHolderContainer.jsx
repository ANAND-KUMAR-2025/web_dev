import React from 'react';
import Placeholder from './PlaceHolder';

const PlaceHolderContainer = () => {
  const placeholder = [...Array(12).keys()]; // 0 to 11

  return (
    <section className="py-5" id="shop">
      <h4 style={{ textAlign: "center" }}>
        Our Products
      </h4>

      <div className="container px-4 px-lg-5 mt-5">
        <div className="row justify-content-center g-4">
          {placeholder.map(num => (
            <Placeholder key={num} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlaceHolderContainer;
