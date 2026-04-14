import React, { useState, useEffect } from 'react';
import { getServices } from '../services/api';
import ServiceCard from '../components/ServiceCard';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (err) {
        setError('Failed to load services.');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <div className="status">Loading services...</div>;
  if (error) return <div className="status error">{error}</div>;

  return (
    <div className="page">
      <h1>Our Services</h1>
      <p className="hero-text" style={{ marginBottom: '32px' }}>
        We provide a full suite of digital solutions to help your business thrive in the modern economy.
      </p>
      
      <div className="grid">
        {services.map(service => (
          <ServiceCard key={service._id || service.id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default Services;
