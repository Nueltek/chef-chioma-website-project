'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Mail, Phone, Calendar, Users, Check, X, Clock, MessageSquare } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface Inquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  eventDate?: string;
  guestCount?: number;
  location?: string;
  budget?: string;
  message: string;
  status: string;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  quoted: 'bg-purple-100 text-purple-800',
  confirmed: 'bg-green-100 text-green-800',
  completed: 'bg-gray-100 text-gray-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/inquiries');
      const data = await res.json();
      setInquiries(data.inquiries || []);
    } catch (error) {
      toast.error('Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        toast.success('Status updated');
        fetchInquiries();
        if (selectedInquiry?._id === id) {
          setSelectedInquiry({ ...selectedInquiry, status });
        }
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const filteredInquiries = filter === 'all' 
    ? inquiries 
    : inquiries.filter(i => i.status === filter);

  return (
    <div>
      <Toaster position="top-center" />
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-earth-900 mb-2">Inquiries</h1>
          <p className="font-body text-text-secondary">
            Manage booking requests and client inquiries
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {['all', 'new', 'contacted', 'quoted', 'confirmed', 'completed', 'cancelled'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 font-sans text-xs uppercase tracking-widest rounded-sm transition-colors whitespace-nowrap ${
              filter === status
                ? 'bg-earth-800 text-cream'
                : 'bg-earth-100 text-earth-600 hover:bg-earth-200'
            }`}
          >
            {status}
            {status === 'new' && inquiries.filter(i => i.status === 'new').length > 0 && (
              <span className="ml-2 px-1.5 py-0.5 bg-copper text-cream text-xs rounded-full">
                {inquiries.filter(i => i.status === 'new').length}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List */}
        <div className="lg:col-span-2 space-y-4">
          {loading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="bg-white border border-earth-200 rounded-sm p-4 animate-pulse">
                <div className="h-6 bg-earth-100 rounded w-1/3 mb-2" />
                <div className="h-4 bg-earth-100 rounded w-1/2" />
              </div>
            ))
          ) : filteredInquiries.length === 0 ? (
            <div className="bg-white border border-earth-200 rounded-sm p-8 text-center">
              <MessageSquare className="w-12 h-12 text-earth-300 mx-auto mb-4" />
              <p className="font-body text-text-secondary">No inquiries found</p>
            </div>
          ) : (
            filteredInquiries.map((inquiry) => (
              <button
                key={inquiry._id}
                onClick={() => setSelectedInquiry(inquiry)}
                className={`w-full text-left bg-white border rounded-sm p-4 transition-all hover:shadow-sm ${
                  selectedInquiry?._id === inquiry._id
                    ? 'border-copper shadow-sm'
                    : 'border-earth-200'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display text-lg text-earth-900 truncate">
                        {inquiry.name}
                      </h3>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${statusColors[inquiry.status]}`}>
                        {inquiry.status}
                      </span>
                    </div>
                    <p className="font-body text-sm text-text-secondary truncate">
                      {inquiry.serviceType} • {inquiry.email}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-body text-xs text-text-muted">
                      {format(new Date(inquiry.createdAt), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-1">
          {selectedInquiry ? (
            <div className="bg-white border border-earth-200 rounded-sm p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl text-earth-900">Details</h2>
                <span className={`px-3 py-1 text-xs rounded-full ${statusColors[selectedInquiry.status]}`}>
                  {selectedInquiry.status}
                </span>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="font-sans text-xs uppercase tracking-widest text-text-muted mb-1">Name</p>
                  <p className="font-body text-earth-900">{selectedInquiry.name}</p>
                </div>

                <div className="flex gap-4">
                  <a href={`mailto:${selectedInquiry.email}`} className="flex items-center gap-2 text-copper hover:underline">
                    <Mail className="w-4 h-4" />
                    <span className="font-body text-sm">{selectedInquiry.email}</span>
                  </a>
                </div>

                <div>
                  <a href={`tel:${selectedInquiry.phone}`} className="flex items-center gap-2 text-copper hover:underline">
                    <Phone className="w-4 h-4" />
                    <span className="font-body text-sm">{selectedInquiry.phone}</span>
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-sans text-xs uppercase tracking-widest text-text-muted mb-1">Service</p>
                    <p className="font-body text-sm text-earth-900">{selectedInquiry.serviceType}</p>
                  </div>
                  {selectedInquiry.eventDate && (
                    <div>
                      <p className="font-sans text-xs uppercase tracking-widest text-text-muted mb-1">Date</p>
                      <p className="font-body text-sm text-earth-900">
                        {format(new Date(selectedInquiry.eventDate), 'MMM d, yyyy')}
                      </p>
                    </div>
                  )}
                  {selectedInquiry.guestCount && (
                    <div>
                      <p className="font-sans text-xs uppercase tracking-widest text-text-muted mb-1">Guests</p>
                      <p className="font-body text-sm text-earth-900">{selectedInquiry.guestCount}</p>
                    </div>
                  )}
                  {selectedInquiry.budget && (
                    <div>
                      <p className="font-sans text-xs uppercase tracking-widest text-text-muted mb-1">Budget</p>
                      <p className="font-body text-sm text-earth-900">{selectedInquiry.budget}</p>
                    </div>
                  )}
                </div>

                <div>
                  <p className="font-sans text-xs uppercase tracking-widest text-text-muted mb-1">Message</p>
                  <p className="font-body text-sm text-earth-900 whitespace-pre-wrap">{selectedInquiry.message}</p>
                </div>
              </div>

              {/* Status Actions */}
              <div className="border-t border-earth-200 pt-4">
                <p className="font-sans text-xs uppercase tracking-widest text-text-muted mb-3">Update Status</p>
                <div className="flex flex-wrap gap-2">
                  {['contacted', 'quoted', 'confirmed', 'completed', 'cancelled'].map((status) => (
                    <button
                      key={status}
                      onClick={() => updateStatus(selectedInquiry._id, status)}
                      disabled={selectedInquiry.status === status}
                      className={`px-3 py-1.5 text-xs rounded-sm transition-colors ${
                        selectedInquiry.status === status
                          ? 'bg-earth-200 text-earth-500 cursor-not-allowed'
                          : 'bg-earth-100 text-earth-700 hover:bg-earth-200'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-earth-200 rounded-sm p-8 text-center">
              <Mail className="w-12 h-12 text-earth-300 mx-auto mb-4" />
              <p className="font-body text-text-secondary">Select an inquiry to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
