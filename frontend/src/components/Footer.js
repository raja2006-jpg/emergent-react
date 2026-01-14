import React from 'react';
import { Linkedin, Instagram, Mail, ArrowUp } from 'lucide-react';
import { Button } from './ui/button';

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const footerLinks = {
    'Services': [
      { name: 'Web Development', id: 'services' },
      { name: 'UI/UX Design', id: 'services' },
      { name: 'Responsive Design', id: 'services' },
      { name: 'Figma to Code', id: 'services' }
    ],
    'Company': [
      { name: 'About Us', id: 'about' },
      { name: 'Portfolio', id: 'portfolio' },
      { name: 'Process', id: 'process' },
      { name: 'Contact', id: 'contact' }
    ]
  };

  return (
    <footer className="relative bg-black/50 backdrop-blur-lg border-t border-white/10" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-white">
                <span className="text-blue-500">NeX</span>Let
              </div>
              
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Crafting modern, responsive & scalable web solutions. Where code meets creativity.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/in/raja-siddharth-722ab7372"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-blue-500/20 flex items-center justify-center transition-colors"
                data-testid="footer-linkedin"
              >
                <Linkedin className="h-5 w-5 text-blue-400" />
              </a>
              <a
                href="https://www.instagram.com/nexlet_solutions"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-pink-500/20 flex items-center justify-center transition-colors"
                data-testid="footer-instagram"
              >
                <Instagram className="h-5 w-5 text-pink-400" />
              </a>
              <a
                href="mailto:rajasiddharthrajasiddharth@gmail.com"
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-purple-500/20 flex items-center justify-center transition-colors"
                data-testid="footer-email"
              >
                <Mail className="h-5 w-5 text-purple-400" />
              </a>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.Services.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                    data-testid={`footer-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.Company.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                    data-testid={`footer-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3 className="text-white font-semibold mb-4">Get Started</h3>
            <p className="text-gray-400 text-sm mb-4">
              Ready to transform your digital presence?
            </p>
            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
              data-testid="footer-contact-btn"
            >
              Contact Us
            </Button>
            
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} NeXLet — Crafting modern, responsive & scalable web solutions.
          </p>
          <Button
            onClick={scrollToTop}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
            data-testid="scroll-to-top-btn"
          >
            <ArrowUp className="h-4 w-4 mr-2" />
            Back to Top
          </Button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
