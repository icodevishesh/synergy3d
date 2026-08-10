'use client';

import React, { useState } from 'react';
import { User, Building, Mail, Phone, Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface ArticleLeadFormProps {
  slug: string;
  articleTitle: string;
}

export default function ArticleLeadForm({ slug, articleTitle }: ArticleLeadFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    practiceName: '',
    email: '',
    contact: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.practiceName || !formData.email || !formData.contact) {
      setSubmitStatus('error');
      setErrorMessage('All fields are required.');
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      const res = await fetch('/api/articles/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          articleSlug: slug,
          articleTitle: articleTitle || '',
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }
      setSubmitStatus('success');
      setFormData({
        fullName: '',
        practiceName: '',
        email: '',
        contact: '',
      });
    } catch (err: any) {
      setSubmitStatus('error');
      setErrorMessage(err.message || 'Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <aside className="w-full lg:w-[300px] shrink-0 lg:sticky lg:top-22 bg-[#fafbff] border border-[#e4ecf8] rounded-2xl p-4 shadow-md transition-all">
      <div className="mb-4">
        <h3 className="font-serif text-lg font-bold text-navy-text mb-2">
          Connect with our Lab
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Have questions about this article or a case? Fill out your details below and a Synergy 3D specialist will reach out.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-[10px] font-bold uppercase tracking-wider text-navy-text mb-1">
            Full Name
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted-dark pointer-events-none">
              <User className="w-4 h-4" />
            </span>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Dr. Jane Doe"
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#dde4f5] rounded-lg focus:outline-none focus:border-blue-default transition-all placeholder:text-gray-400/70"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="practiceName" className="block text-[10px] font-bold uppercase tracking-wider text-navy-text mb-1">
            Practice Name
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted-dark pointer-events-none">
              <Building className="w-4 h-4" />
            </span>
            <input
              type="text"
              id="practiceName"
              name="practiceName"
              value={formData.practiceName}
              onChange={handleInputChange}
              placeholder="Apex Dental Care"
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#dde4f5] rounded-lg focus:outline-none focus:border-blue-default transition-all placeholder:text-gray-400/70"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-wider text-navy-text mb-1">
            Email Address
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted-dark pointer-events-none">
              <Mail className="w-4 h-4" />
            </span>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="jane.doe@example.com"
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#dde4f5] rounded-lg focus:outline-none focus:border-blue-default transition-all placeholder:text-gray-400/70"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="contact" className="block text-[10px] font-bold uppercase tracking-wider text-navy-text mb-1">
            Contact Number
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted-dark pointer-events-none">
              <Phone className="w-4 h-4" />
            </span>
            <input
              type="tel"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              placeholder="(555) 000-0000"
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#dde4f5] rounded-lg focus:outline-none focus:border-blue-default transition-all placeholder:text-gray-400/70"
              required
            />
          </div>
        </div>

        {submitStatus === 'success' && (
          <div className="flex gap-2.5 p-3.5 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-800 text-xs">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
            <div>
              <p className="font-semibold">Successfully Submitted!</p>
              <p className="text-[11px] text-emerald-700/90 mt-0.5">Thank you, we'll get in touch with you shortly.</p>
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="flex gap-2.5 p-3.5 bg-red-50 border border-red-100 rounded-lg text-red-800 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
            <div>
              <p className="font-semibold">Submission Failed</p>
              <p className="text-[11px] text-red-700/90 mt-0.5">{errorMessage}</p>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-2 bg-gradient-to-r from-blue-default to-blue-bright hover:to-blue-default text-white font-bold py-2.5 px-4 rounded-lg text-sm transition-all hover:shadow-md cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              <span>Submit Details</span>
            </>
          )}
        </button>
      </form>
    </aside>
  );
}
