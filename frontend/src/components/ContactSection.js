import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Mail, Phone, MapPin, Send, Linkedin, Instagram } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterLoading, setNewsletterLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceChange = (value) => {
    setFormData({ ...formData, service: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API}/contact`, formData);
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    if (!newsletterEmail) {
      toast.error('Please enter your email');
      return;
    }

    setNewsletterLoading(true);
    try {
      await axios.post(`${API}/newsletter`, { email: newsletterEmail });
      toast.success('Successfully subscribed to newsletter!');
      setNewsletterEmail('');
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error('This email is already subscribed');
      } else {
        toast.error('Failed to subscribe. Please try again.');
      }
    } finally {
      setNewsletterLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative" data-testid="contact-section">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Let's Build Something Powerful Together
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-lg" data-testid="contact-form-card">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Send us a Message</CardTitle>
              <CardDescription className="text-gray-400">
                Fill out the form below and we'll get back to you within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-white">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                    required
                    data-testid="contact-name-input"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-white">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                    required
                    data-testid="contact-email-input"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-white">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                    data-testid="contact-phone-input"
                  />
                </div>

                <div>
                  <Label htmlFor="service" className="text-white">Service Interested In</Label>
                  <Select value={formData.service} onValueChange={handleServiceChange}>
                    <SelectTrigger 
                      className="bg-white/10 border-white/20 text-white"
                      data-testid="contact-service-select"
                    >
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent className="bg-white-10 text-white  border-white/20 bg-gray-900">
                      <SelectItem value="web-development">Web Development</SelectItem>
                      <SelectItem value="ui-ux-design">UI/UX Design</SelectItem>
                      <SelectItem value="responsive-design">Responsive Design</SelectItem>
                      <SelectItem value="figma-to-code">Figma to Code</SelectItem>
                      <SelectItem value="performance-optimization">Performance Optimization</SelectItem>
                      <SelectItem value="landing-pages">Landing Pages</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message" className="text-white">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 min-h-[120px]"
                    required
                    data-testid="contact-message-input"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                  disabled={loading}
                  data-testid="contact-submit-btn"
                >
                  {loading ? 'Sending...' : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info & Newsletter */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Contact Information</CardTitle>
                <CardDescription className="text-gray-400">
                  Reach out to us through any of these channels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <a
                  href="mailto:rajasiddharthrajasiddharth@gmail.com"
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                  data-testid="contact-email-link"
                >
                  <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                    <Mail className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Email</div>
                    <div className="text-white font-medium">rajasiddharthrajasiddharth@gmail.com</div>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/raja-siddharth-722ab7372"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                  data-testid="contact-linkedin-link"
                >
                  <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                    <Linkedin className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">LinkedIn</div>
                    <div className="text-white font-medium">Connect with us</div>
                  </div>
                </a>

                <a
                  href="https://www.instagram.com/nexlet_solutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                  data-testid="contact-instagram-link"
                >
                  <div className="h-10 w-10 rounded-full bg-pink-500/20 flex items-center justify-center group-hover:bg-pink-500/30 transition-colors">
                    <Instagram className="h-5 w-5 text-pink-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Instagram</div>
                    <div className="text-white font-medium">Follow our work</div>
                  </div>
                </a>
              </CardContent>
            </Card>

            {/* Newsletter Subscription */}
           
              <CardHeader>
                
                
              </CardHeader>
              
            
             
              
            
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;