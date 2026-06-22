'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';

export default function ApplyPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    acceptTerms: false,
  });

  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, acceptTerms: e.target.checked }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validate size (max 2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes
    if (selectedFile.size > maxSize) {
      setFileError('File size exceeds 2MB limit.');
      setFile(null);
      return;
    }

    // Validate extension
    const allowedExtensions = ['.doc', '.docx', '.pdf'];
    const fileName = selectedFile.name.toLowerCase();
    const isValidExtension = allowedExtensions.some((ext) => fileName.endsWith(ext));

    if (!isValidExtension) {
      setFileError('Invalid file format. Please choose a .doc, .docx, or .pdf file.');
      setFile(null);
      return;
    }

    setFileError(null);
    setFile(selectedFile);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.acceptTerms) return;

    setIsSubmitting(true);
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="bg-[#f9f8f3] min-h-screen text-navy-text font-sans pb-24">
      {/* Hero Header */}
      <section className="relative bg-navy pt-36 pb-20 overflow-hidden before:absolute before:inset-0 before:bg-radial-glow before:pointer-events-none text-center">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)] bg-[size:50px_50px] pointer-events-none" />
        <div className="max-w-[1140px] mx-auto px-6 md:px-16 relative z-10">
          {/* Breadcrumb */}
          <div className="flex gap-2 text-[0.78rem] text-white/40 mb-6 justify-center">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <span className="text-white/20">›</span>
            <Link href="/about-us" className="hover:text-white/70 transition-colors">About Us</Link>
            <span className="text-white/20">›</span>
            <span className="text-white/70 font-medium">Join Our Team</span>
          </div>
          <span className="block text-[0.7rem] font-bold tracking-[0.2em] uppercase text-blue-glow mb-5">
            Careers
          </span>
          <h1 className="font-serif text-5xl sm:text-6xl font-extrabold text-white leading-[1.06] mb-5">
            Build the future of <em className="italic text-blue-glow">digital dentistry.</em>
          </h1>
          <p className="text-[0.98rem] text-muted-dark leading-relaxed max-w-[480px] mx-auto">
            Submit your resume and details below. Let&apos;s create something remarkable together.
          </p>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="max-w-[680px] mx-auto px-6 mt-16">
        <div className="bg-white rounded-3xl border border-gray-200/60 shadow-premium p-8 md:p-12">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Name Input */}
              <div className="flex flex-col">
                <input
                  required
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Full name"
                  className="bg-transparent border border-gray-900 rounded-xl px-5 py-4 text-[0.95rem] outline-none focus:ring-2 focus:ring-sky-400 transition-all text-navy-text placeholder-gray-500"
                  value={form.name}
                  onChange={handleInputChange}
                />
              </div>

              {/* Email Input */}
              <div className="flex flex-col">
                <input
                  required
                  type="email"
                  name="email"
                  id="email"
                  placeholder="E-mail address"
                  className="bg-transparent border border-gray-900 rounded-xl px-5 py-4 text-[0.95rem] outline-none focus:ring-2 focus:ring-sky-400 transition-all text-navy-text placeholder-gray-500"
                  value={form.email}
                  onChange={handleInputChange}
                />
              </div>

              {/* Contact number Input */}
              <div className="flex flex-col">
                <input
                  required
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="Contact number"
                  className="bg-transparent border border-gray-900 rounded-xl px-5 py-4 text-[0.95rem] outline-none focus:ring-2 focus:ring-sky-400 transition-all text-navy-text placeholder-gray-500"
                  value={form.phone}
                  onChange={handleInputChange}
                />
              </div>

              {/* Message Textarea */}
              <div className="flex flex-col">
                <textarea
                  name="message"
                  id="message"
                  rows={6}
                  placeholder="Message"
                  className="bg-transparent border border-gray-900 rounded-xl px-5 py-4 text-[0.95rem] outline-none focus:ring-2 focus:ring-sky-400 transition-all text-navy-text placeholder-gray-500 resize-y"
                  value={form.message}
                  onChange={handleInputChange}
                />
              </div>

              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".doc,.docx,.pdf"
                onChange={handleFileChange}
              />

              {/* Choose CV Action Container */}
              <div className="flex flex-col gap-2.5">
                <div className="text-[0.85rem] text-gray-700">
                  Choose .doc, .docx or .pdf format to max 2MB.
                </div>

                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="bg-blue-default hover:bg-blue-glow text-white font-bold py-4 px-6 rounded-2xl text-base transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm select-none"
                >
                  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Choose CV
                </button>

                {/* File feedback */}
                {file && (
                  <div className="flex items-center gap-2.5 px-4 py-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-sm">
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="font-semibold truncate max-w-[280px]">{file.name}</span>
                    <span className="text-xs opacity-75">({(file.size / 1024).toFixed(1)} KB)</span>
                    <button 
                      type="button" 
                      onClick={() => setFile(null)} 
                      className="ml-auto text-emerald-800/60 hover:text-emerald-800 text-xs font-bold"
                    >
                      Clear
                    </button>
                  </div>
                )}

                {fileError && (
                  <div className="flex items-center gap-2.5 px-4 py-2.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg text-sm font-medium">
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span>{fileError}</span>
                  </div>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="flex flex-col gap-4 mt-2">
                <p className="text-xs text-gray-500 leading-relaxed font-normal">
                  This form collects your personal data, so our support team can communicate with you and provide support. Check our Privacy Policy so you can find out how we protect and manage your sent personal data.
                </p>
                <label className="flex items-center gap-3 cursor-pointer group select-none">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-400 text-blue-default focus:ring-blue-glow cursor-pointer"
                    checked={form.acceptTerms}
                    onChange={handleCheckboxChange}
                  />
                  <span className="text-[0.88rem] text-gray-700 leading-tight">
                    I accept that Synergy3D collects my data through this form.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="mt-4">
                <button
                  type="submit"
                  disabled={!form.acceptTerms || isSubmitting}
                  className={`bg-blue-default hover:bg-blue-glow text-white font-bold py-3 px-10 rounded-full text-base transition-all select-none shadow-sm flex items-center justify-center gap-2 ${
                    (!form.acceptTerms || isSubmitting) ? 'opacity-55 cursor-not-allowed hover:bg-blue-glow' : 'cursor-pointer hover:-translate-y-0.5 active:translate-y-0'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </>
                  ) : 'Send'}
                </button>
              </div>
            </form>
          ) : (
            /* Success state */
            <div className="text-center py-12 flex flex-col items-center gap-5">
              <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-4xl mb-2 shadow-inner">
                🎉
              </div>
              <h3 className="font-serif text-3xl font-bold text-navy-text">Application Submitted!</h3>
              <p className="text-[0.95rem] text-gray-500 max-w-[380px] leading-relaxed">
                Thank you for applying to join the Synergy 3D team. We have received your CV and message. Our hiring team will review it and get back to you soon.
              </p>
              <Link
                href="/about-us"
                className="mt-6 inline-block bg-navy hover:bg-navy-light text-white font-bold py-3.5 px-8 rounded-full text-[0.92rem] transition-all hover:-translate-y-0.5"
              >
                Back to About Us
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
