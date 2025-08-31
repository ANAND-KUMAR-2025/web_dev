import React from 'react';
import HomeCard from './HomeCard'; // Product card component

const CardContainer = ({ products }) => {
  return (
    <section className="py-5" id="shop">
      <div id="products" className="container py-5"> 
      <h2 className="text-center fw-bold mb-4">Our Products</h2>
      <div className="container px-4 px-lg-5 mt-3">
        <div className="row justify-content-center g-4">
          {products?.map((item) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={item.id}>
              <HomeCard
                product={item}
                title={item.name}
                price={item.price}
                description={item.description}
                image={item.image}
                slug={item.slug}
              />
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
};

export default CardContainer;
