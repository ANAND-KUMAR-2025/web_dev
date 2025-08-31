import React from 'react';

const Placeholder = () => {
  return (
    <div className="card my-3 p-2 shadow-sm" aria-hidden="true" style={{ width: '18rem' }}>
      <div className="placeholder-glow">
        <div
          className="card-img-top rounded placeholder"
          style={{
            height: '180px',
            backgroundColor: '#dee2e6',
          }}
        ></div>
      </div>

      <div className="card-body placeholder-glow">
        <p className="card-title placeholder col-10 rounded mb-2" style={{ height: '20px' }}></p>
        <p className="card-text placeholder col-6 rounded mb-1" style={{ height: '16px' }}></p>
        <p className="card-text placeholder col-4 rounded" style={{ height: '16px' }}></p>
      </div>
    </div>
  );
};

export default Placeholder;
