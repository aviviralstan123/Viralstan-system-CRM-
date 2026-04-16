import React from 'react'

const ServiceCard = ({ service }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h3>{service.title || service.name || 'Untitled Service'}</h3>
        <p>{service.description || 'No description available.'}</p>
      </div>
    </div>
  )
}

export default ServiceCard
