import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, Mail, Phone, MessageSquare, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function AdminPage() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${API}/contact`);
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Failed to load contact submissions');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Manage contact submissions and inquiries</p>
          </div>
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="bg-white/10 hover:bg-white/20 border-white/20"
            data-testid="back-to-home-btn"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>

        <div className="grid gap-4 mb-8">
          <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-white">Contact Submissions</CardTitle>
              <CardDescription className="text-gray-400">
                Total submissions: {contacts.length}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8 text-gray-400">Loading...</div>
              ) : contacts.length === 0 ? (
                <div className="text-center py-8 text-gray-400">No submissions yet</div>
              ) : (
                <div className="space-y-4">
                  {contacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                      data-testid={`contact-item-${contact.id}`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-1">{contact.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                              <Mail className="h-4 w-4" />
                              {contact.email}
                            </span>
                            {contact.phone && (
                              <span className="flex items-center gap-1">
                                <Phone className="h-4 w-4" />
                                {contact.phone}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {contact.service && (
                            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                              {contact.service}
                            </Badge>
                          )}
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(contact.timestamp)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-gray-300">
                        <MessageSquare className="h-4 w-4 mt-1 flex-shrink-0" />
                        <p className="text-sm">{contact.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;