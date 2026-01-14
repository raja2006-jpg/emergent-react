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
import { Helmet } from 'react-helmet-async';

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
      setPortfolioItems(response.data || []);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      setPortfolioItems([]); // fallback so UI never breaks
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">

      {/* ================= SEO META TAGS ================= */}
      <Helmet>
        <title>NeXLet – Web Development & UI/UX Design Agency</title>

        <meta
          name="description"
          content="NeXLet is a modern web development agency specializing in responsive websites, UI/UX design, landing pages, and scalable digital solutions."
        />

        <meta
          name="keywords"
          content="Web Development Agency, UI UX Design, Landing Page Design, Website Development, NeXLet"
        />

        <meta name="author" content="NeXLet" />

        {/* Open Graph (Google + Facebook) */}
        <meta property="og:title" content="NeXLet – Web Development & UI/UX Design Agency" />
        <meta
          property="og:description"
          content="Professional web development, UI/UX design, and digital solutions for startups and businesses."
        />
        <meta property="og:url" content="https://nexlet.vercel.app" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="NeXLet – Web Development & UI/UX Design Agency" />
        <meta
          name="twitter:description"
          content="Modern websites, UI/UX design, and scalable solutions by NeXLet."
        />
      </Helmet>
      {/* ================================================= */}

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
