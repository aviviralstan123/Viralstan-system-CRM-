import React from 'react';

const ServiceCard = ({ service }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h3 className="brand-indigo">{service.title}</h3>
        <p>{service.description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
