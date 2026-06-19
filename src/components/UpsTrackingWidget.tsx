"use client";
// components/UPSTrackingWidget.tsx
import { useState, useEffect } from "react";
import Image from "next/image";
import upsLogo from "../app/assets/ups-logo.svg";

interface TrackingActivity {
  status: string;
  location: string;
  date: string;
  time: string;
}

interface TrackingResult {
  trackingNumber: string;
  currentStatus: string;
  deliveryDate: string | null;
  deliveryTime: string | null;
  activity: TrackingActivity[];
}

interface UPSTrackingWidgetProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function UPSTrackingWidget({ isOpen: controlledIsOpen, onClose: controlledOnClose }: UPSTrackingWidgetProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleOpen = () => {
      setInternalIsOpen(true);
      document.body.style.overflow = "hidden";
    };
    window.addEventListener("open-tracking-modal", handleOpen);
    return () => {
      window.removeEventListener("open-tracking-modal", handleOpen);
    };
  }, []);

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  if (!isOpen) return null;

  const handleTrack = async () => {
    if (!trackingNumber.trim()) {
      setError("Please enter a tracking number");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`/api/ups/track/${trackingNumber.trim()}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch tracking info");
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string) => {
    if (!date || date.length !== 8) return date;
    // UPS format: YYYYMMDD
    const y = date.slice(0, 4);
    const m = date.slice(4, 6);
    const d = date.slice(6, 8);
    return new Date(`${y}-${m}-${d}`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (time: string) => {
    if (!time || time.length !== 6) return "";
    const h = time.slice(0, 2);
    const m = time.slice(2, 4);
    return new Date(`1970-01-01T${h}:${m}:00`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const handleClose = () => {
    setTrackingNumber("");
    setResult(null);
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

  return (
    <div 
      className="fixed inset-0 z-[5000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4">
          <div className="flex items-center gap-3">
            <div>
              <Image src={upsLogo} alt="UPS Logo" width={50} height={50} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900">Track Your Shipment</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Enter the tracking number from your email to check shipment status.
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

        {/* Content */}
        <div className="px-6 pb-6">
          <div className="flex gap-2 mb-6">
            <input
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleTrack()}
              placeholder="1Z999AA10123456784"
              className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleTrack}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium px-6 py-3 rounded-lg text-sm transition-colors"
            >
              {loading ? "Tracking..." : "Track"}
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700 mb-4">
              {error}
            </div>
          )}

          {result && (
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              {/* Status header */}
              <div className="bg-blue-50 px-5 py-4 border-b border-gray-200">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                  Tracking #{result.trackingNumber}
                </p>
                <p className="text-lg font-bold text-blue-700">{result.currentStatus}</p>
                {result.deliveryDate && (
                  <p className="text-sm text-gray-600 mt-1">
                    {result.currentStatus.toLowerCase().includes("delivered")
                      ? "Delivered on"
                      : "Estimated delivery"}{" "}
                    {formatDate(result.deliveryDate)}
                    {result.deliveryTime && ` at ${formatTime(result.deliveryTime)}`}
                  </p>
                )}
              </div>

              {/* Activity timeline */}
              <div className="p-5 max-h-[40vh] overflow-y-auto">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Shipment History</h3>
                <div className="space-y-4">
                  {result.activity.length === 0 && (
                    <p className="text-sm text-gray-400">No activity yet.</p>
                  )}
                  {result.activity.map((a, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-2.5 h-2.5 rounded-full ${
                            i === 0 ? "bg-blue-600" : "bg-gray-300"
                          }`}
                        />
                        {i !== result.activity.length - 1 && (
                          <div className="w-px flex-1 bg-gray-200 mt-1" />
                        )}
                      </div>
                      <div className="pb-4">
                        <p className="text-sm font-medium text-gray-900">{a.status}</p>
                        <p className="text-xs text-gray-500">
                          {a.location} · {formatDate(a.date)} {formatTime(a.time)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}