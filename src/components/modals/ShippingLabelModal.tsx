"use client";
// components/UPSShippingModal.tsx
import { useState, useEffect } from "react";
import Image from "next/image";
import upsLogo from "../../../src/app/assets/ups-logo.svg";

interface UPSShippingModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

interface FormData {
  practiceName: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  weight: string;
  casesEnclosed: string;
}

const initialForm: FormData = {
  practiceName: "",
  contactName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  weight: "",
  casesEnclosed: "",
};

export default function UPSShippingModal({ isOpen: controlledIsOpen, onClose: controlledOnClose }: UPSShippingModalProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [step, setStep] = useState<'select' | 'warning' | 'form'>('select');
  const [form, setForm] = useState<FormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleOpen = () => {
      setStep('select');
      setInternalIsOpen(true);
      document.body.style.overflow = "hidden";
    };
    window.addEventListener("open-shipping-modal", handleOpen);
    return () => {
      window.removeEventListener("open-shipping-modal", handleOpen);
    };
  }, []);

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Basic validation
    if (!form.practiceName || !form.email || !form.address || 
        !form.city || !form.state || !form.zip || !form.weight) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/ups/create-label", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setSuccess(`Label sent! Tracking #${data.trackingNumber}`);
      setForm(initialForm);
    } catch (err: any) {
      setError(err.message || "Failed to generate label. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setForm(initialForm);
    setSuccess(null);
    setError(null);
    setInternalIsOpen(false);
    document.body.style.overflow = "";
    if (controlledOnClose) {
      controlledOnClose();
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (step === 'select') {
    return (
      <div 
        className="fixed inset-0 z-[5000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={handleOverlayClick}
      >
        <div className="bg-white rounded-xl w-full max-w-sm shadow-2xl p-6 text-gray-900">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-base font-bold text-gray-900">What are you looking for?</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <button 
              onClick={() => setStep('form')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-6 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              New Shipment
            </button>
            
            <button 
              onClick={() => setStep('warning')}
              className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3.5 px-6 rounded-xl text-xs border border-gray-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              Reverse Shipment
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'warning') {
    return (
      <div 
        className="fixed inset-0 z-[5000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={handleOverlayClick}
      >
        <div className="bg-white rounded-xl w-full max-w-sm shadow-2xl p-6 text-gray-900">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-bold text-gray-900">For Reverse Shipment</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <p className="text-xs text-gray-500 mb-6 leading-relaxed">
            Labels used for this will be charged to your account if not pre-authorized by the Lab.
          </p>

          <div className="flex gap-3">
            <button 
              onClick={() => setStep('form')}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl text-xs transition-colors flex items-center justify-center cursor-pointer shadow-sm"
            >
              Continue Anyway
            </button>
            <button 
              onClick={handleClose}
              className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-4 rounded-xl text-xs border border-gray-200 transition-colors flex items-center justify-center cursor-pointer"
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 z-[5000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4">
          <div className="flex items-center gap-3">
            {/* UPS Logo SVG */}
            <div>
              <Image src={upsLogo} alt="UPS Logo" width={50} height={50} />
            </div>
            <div>
              <button
                onClick={() => setStep('select')}
                className="text-[11px] text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-0.5 mb-1 cursor-pointer font-medium"
              >
                ← Back to choices
              </button>
              <h2 className="text-sm font-bold text-gray-900">Generate a Shipping Label</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Pick a carrier and tell us where to send the case. We&apos;ll email you a prepaid label.
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors ml-4 mt-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Success State */}
        {success ? (
          <div className="px-6 pb-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-green-800 font-semibold text-lg mb-1">Label Sent!</h3>
              <p className="text-green-700 text-sm mb-1">{success}</p>
              <p className="text-green-600 text-xs">Check your email for the prepaid UPS label PDF.</p>
              <button
                onClick={handleClose}
                className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div className="px-6 pb-6 space-y-4">
            <div className=" py-1 px-2 bg-amber-100 rounded-sm">
              <p className="text-[10px] text-gray-900 text-start italic">*Please do not send back crowns or any returns for credits, unless pre-authorized by the lab. Labels used for this will be charged to your account.</p>
            </div>

            {/* Row 1 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  Practice Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="practiceName"
                  value={form.practiceName}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[10px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Practice name"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  Contact Name
                </label>
                <input
                  name="contactName"
                  value={form.contactName}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[10px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Contact name"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[10px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  Phone
                </label>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[10px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(555) 000-0000"
                />
              </div>
            </div>

            {/* Row 3 - Full width */}
            <div>
              <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Pickup Address <span className="text-red-500">*</span>
              </label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[10px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Street address"
              />
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[10px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="City"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  State / ZIP <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[10px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="NY"
                    maxLength={2}
                  />
                  <input
                    name="zip"
                    value={form.zip}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[10px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="10001"
                    maxLength={5}
                  />
                </div>
              </div>
            </div>

            {/* Row 5 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  Package Weight (lbs) <span className="text-red-500">*</span>
                </label>
                <input
                  name="weight"
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={form.weight}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[10px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.0"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  Cases Enclosed
                </label>
                <input
                  name="casesEnclosed"
                  type="number"
                  min="1"
                  value={form.casesEnclosed}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[10px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors mt-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span className="text-xs">Generating Label...</span>
                </>
              ) : (
                <>
                  <span className="text-xs">Email me a UPS label</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
