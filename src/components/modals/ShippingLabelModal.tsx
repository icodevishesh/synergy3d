'use client';

import React, { useState, useEffect } from 'react';

export const ShippingLabelModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [carrier, setCarrier] = useState<'UPS' | 'FedEx'>('UPS');
  const [practice, setPractice] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    };
    window.addEventListener('open-shipping-modal', handleOpen);
    return () => window.removeEventListener('open-shipping-modal', handleOpen);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
    // Reset forms after close transitions
    setTimeout(() => {
      setIsSubmitted(false);
      setPractice('');
      setEmail('');
      setAddress('');
    }, 300);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!practice || !email || !address) {
      alert('Please fill in all required fields.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[3000] bg-black/45 backdrop-blur-[6px] flex items-center justify-center p-6 transition-opacity duration-250"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-2xl max-w-[560px] w-full max-h-[90vh] overflow-y-auto shadow-modal relative transition-transform duration-250 text-navy-text">
        <button 
          className="absolute top-5 right-5 w-7 h-7 rounded-full bg-gray-100 border-none cursor-pointer flex items-center justify-center text-[0.9rem] text-gray-500 hover:bg-gray-200 transition-colors"
          onClick={handleClose}
        >
          ✕
        </button>

        <div className="p-6 pb-0">
          <h3 className="text-[1.1rem] font-bold text-navy-text mb-1">Create Shipping Label</h3>
          <p className="text-[0.85rem] text-gray-500 leading-relaxed">
            Generate a complimentary shipping label to send your physical impressions or models to our New York laboratory.
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                className={`py-3 rounded-lg border-2 font-semibold transition-all duration-200 ${
                  carrier === 'UPS'
                    ? 'border-blue-default bg-blue-default/5 text-blue-default'
                    : 'border-border-light bg-white text-gray-700 hover:border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => setCarrier('UPS')}
              >
                UPS
              </button>
              <button
                type="button"
                className={`py-3 rounded-lg border-2 font-semibold transition-all duration-200 ${
                  carrier === 'FedEx'
                    ? 'border-blue-default bg-blue-default/5 text-blue-default'
                    : 'border-border-light bg-white text-gray-700 hover:border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => setCarrier('FedEx')}
              >
                FedEx
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[0.68rem] font-bold tracking-widest uppercase text-gray-500">Practice Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Park Avenue Family Dentistry"
                className="bg-gray-50 border border-border-light rounded-lg p-2.5 text-[0.9rem] outline-none focus:border-blue-default transition-colors w-full"
                value={practice}
                onChange={e => setPractice(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.68rem] font-bold tracking-widest uppercase text-gray-500">Doctor Email *</label>
                <input
                  type="email"
                  required
                  placeholder="doctor@practice.com"
                  className="bg-gray-50 border border-border-light rounded-lg p-2.5 text-[0.9rem] outline-none focus:border-blue-default transition-colors w-full"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.68rem] font-bold tracking-widest uppercase text-gray-500">Suite / Room #</label>
                <input
                  type="text"
                  placeholder="e.g. Suite 402"
                  className="bg-gray-50 border border-border-light rounded-lg p-2.5 text-[0.9rem] outline-none focus:border-blue-default transition-colors w-full"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[0.68rem] font-bold tracking-widest uppercase text-gray-500">Pickup Address *</label>
              <input
                type="text"
                required
                placeholder="Full address, City, State, ZIP"
                className="bg-gray-50 border border-border-light rounded-lg p-2.5 text-[0.9rem] outline-none focus:border-blue-default transition-colors w-full"
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
            </div>

            <div className="pt-2">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-default hover:bg-blue-bright text-white font-bold py-3.5 px-5 rounded-lg text-[0.95rem] transition-all duration-200 active:translate-y-0 hover:-translate-y-0.5 w-full flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'Requesting...' : `Email me a ${carrier} label`}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </button>
            </div>
            <p className="text-[0.74rem] text-[#aab4ce] text-center leading-relaxed">
              Live carrier integration with UPS & FedEx coming soon. Until then we'll email a hand-generated label within 10 minutes.
            </p>
          </form>
        ) : (
          <div className="p-8 text-center flex flex-col items-center gap-4 bg-gray-50 rounded-b-2xl border-t border-border-light">
            <div className="text-[3.5rem] animate-bounce">✓</div>
            <h4 className="font-serif text-2xl font-bold text-navy-text">Label Request Sent!</h4>
            <p className="text-[0.95rem] text-gray-500 leading-relaxed max-w-[360px]">
              We have received your pickup details for <strong>{practice}</strong>. Check your inbox at <strong>{email}</strong> for your pre-paid {carrier} shipping label within 10 minutes.
            </p>
            <button 
              onClick={handleClose}
              className="bg-blue-default hover:bg-blue-bright text-white font-bold py-2.5 px-6 rounded-lg text-[0.9rem] transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default ShippingLabelModal;
