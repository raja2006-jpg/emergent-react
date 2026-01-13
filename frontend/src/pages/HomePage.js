import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Services from '../components/Services';
import WhyNeXLet from '../components/WhyNeXLet';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import Process from '../components/Process';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function HomePage() {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const response = await axios.get(`${API}/portfolio`);
      setPortfolioItems(response.data);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Navigation />
      <Hero />
      <Services />
      <WhyNeXLet />
      <Portfolio items={portfolioItems} loading={loading} />
      <Testimonials />
      <Process />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default HomePage;