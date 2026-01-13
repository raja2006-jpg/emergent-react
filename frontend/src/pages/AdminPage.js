import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { ArrowLeft, Mail, Phone, MessageSquare, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function AdminPage() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
    // eslint-disable-next-line
  }, []);

  const fetchContacts = async () => {
    const token = localStorage.getItem("admin_token");

    if (!token) {
      toast.error("Please login again");
      navigate("/admin/login");
      return;
    }

    try {
      const res = await axios.get(`${API}/contact`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setContacts(res.data);
    } catch (err) {
      console.error(err);

      if (err.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("admin_token");
        navigate("/admin/login");
      } else {
        toast.error("Failed to load contact submissions");
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-400">Manage contact submissions</p>
          </div>
          <Button
            variant="outline"
            className="bg-white/10 border-white/20"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        {/* Content */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
          <CardHeader>
            <CardTitle>Contact Submissions</CardTitle>
            <CardDescription>Total submissions: {contacts.length}</CardDescription>
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
                    className="p-4 rounded-lg bg-white/5 border border-white/10"
                  >
                    <div className="flex justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold">{contact.name}</h3>
                        <div className="flex gap-4 text-sm text-gray-400">
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

                      <div className="text-right">
                        {contact.service && (
                          <Badge className="bg-blue-500/20 text-blue-300">
                            {contact.service}
                          </Badge>
                        )}
                        <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(contact.timestamp)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-gray-300">
                      <MessageSquare className="h-4 w-4 mt-1" />
                      <p>{contact.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminPage;
