import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'Portfolio', id: 'portfolio' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
      data-testid="main-navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2" data-testid="nexlet-logo">
            <div className="text-2xl font-bold text-white">
              <span className="text-blue-500">NeX</span>Let
            </div>
           
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                data-testid={`nav-link-${link.id}`}
              >
                {link.name}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-blue-500 hover:bg-blue-600 text-white"
              data-testid="get-started-btn"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg" data-testid="mobile-menu">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded transition-colors"
                data-testid={`mobile-nav-link-${link.id}`}
              >
                {link.name}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection('contact')}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white mt-2"
              data-testid="mobile-get-started-btn"
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;