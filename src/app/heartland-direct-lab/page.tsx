'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import JsonLd from "@/components/JsonLd";
import { contacts } from "@/lib/schema/contacts";
import imgZirconia from '@/app/assets/products/zirconia-crown.png';
import imgAllOnX from '@/app/assets/products/all-on-x-hybrid.png';
import imgDentalImplantRestoration from '@/app/assets/products/implant_crowns_from_our_dental_implant_lab.png';

const FEATURED_PRODUCTS = [
  {
    id: 'zirconia-crowns',
    name: 'Zirconia Crowns',
    cat: 'Crown & Bridge',
    desc: 'Full-contour and layered zirconia with natural aesthetics, high flexural strength, and sub-30µm margin fit.',
    img: imgZirconia,
    turnaround: '5 Days',
    href: '/lab-services/products/zirconia-crowns',
  },
  {
    id: 'dental-implant-restoration',
    name: 'Dental Implant Restoration',
    cat: 'Implant Solutions',
    desc: 'Custom abutments, screw-retained crowns, and verified emergence profiles planned for all major implant systems.',
    img: imgDentalImplantRestoration,
    turnaround: '5 Days',
    href: '/lab-services/products/dental-implant-restoration',
  },
  {
    id: 'all-on-x-hybrids',
    name: 'All-on-X Hybrids',
    cat: 'Implant Solutions',
    desc: 'Full-arch fixed zirconia and titanium bar-supported restorations planned directly from your digital scan.',
    img: imgAllOnX,
    turnaround: '7–10 Days',
    href: '/lab-services/products/all-on-x-hybrids',
  },
];

const US_STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut',
  'Delaware','District of Columbia','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa',
  'Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan',
  'Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire',
  'New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio',
  'Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota',
  'Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia',
  'Wisconsin','Wyoming',
];

const ROLES = [
  'Dentist / Owner',
  'Associate Dentist',
  'Office Manager',
  'Lab Coordinator',
  'Dental Assistant',
  'Other',
];

const CASE_TYPES = [
  'Crowns & Bridge',
  'Implant Restorations',
  'All-on-X Hybrids',
  'e.max / Veneers',
  'Dentures',
  'Night Guards',
  'Surgical Guides',
];

const MONTHLY_CASES = ['1–10', '11–25', '26–50', '51–100', '100+'];

const SCANNERS = [
  'iTero',
  '3Shape TRIOS',
  'Medit',
  'Carestream',
  'Dexis',
  'Sirona / Primescan',
  'Planmeca',
  'Other scanner',
  'No scanner (physical impressions)',
];

const FRUSTRATIONS = [
  'Slow or late turnaround',
  'Hard to reach anyone',
  'Remakes and fit issues',
  'Inconsistent shade / aesthetics',
  'Pricing',
  'Other',
];

const CALL_TIMES = [
  'Any time',
  'Morning (8–11 am)',
  'Lunch (11 am–1 pm)',
  'Afternoon (1–5 pm)',
];

export default function CallbackPage() {
  const [step, setStep] = useState<1 | 2>(1);

  // Form State
  const [doctorName, setDoctorName] = useState('');
  const [practice, setPractice] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [heartlandOffice, setHeartlandOffice] = useState('');

  // Step 2 State
  const [caseTypes, setCaseTypes] = useState<string[]>([]);
  const [monthlyCases, setMonthlyCases] = useState('');
  const [scanner, setScanner] = useState('');
  const [currentLab, setCurrentLab] = useState('');
  const [painPoint, setPainPoint] = useState('');
  const [callTime, setCallTime] = useState('');
  const [notes, setNotes] = useState('');
  const [consent, setConsent] = useState(false);

  // Validation & Submission
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Format phone number
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').replace(/^1/, '').slice(0, 10);
    let formatted = raw;
    if (raw.length > 6) {
      formatted = `(${raw.slice(0, 3)}) ${raw.slice(3, 6)}-${raw.slice(6)}`;
    } else if (raw.length > 3) {
      formatted = `(${raw.slice(0, 3)}) ${raw.slice(3)}`;
    } else if (raw.length > 0) {
      formatted = `(${raw}`;
    }
    setPhone(formatted);
    clearError('phone');
  };

  const clearError = (field: string) => {
    setErrors(prev => ({ ...prev, [field]: false }));
    setFormError('');
  };

  const toggleCaseType = (type: string) => {
    setCaseTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const validateStep1 = () => {
    const newErrors: Record<string, boolean> = {};
    if (!doctorName.trim()) newErrors.doctorName = true;
    if (!practice.trim()) newErrors.practice = true;
    if (phone.replace(/\D/g, '').length !== 10) newErrors.phone = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) newErrors.email = true;
    if (!role) newErrors.role = true;
    if (!state) newErrors.state = true;
    if (zip.trim() && !/^\d{5}(-\d{4})?$/.test(zip.trim())) newErrors.zip = true;
    if (!heartlandOffice) newErrors.heartlandOffice = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, boolean> = {};
    if (!monthlyCases) newErrors.monthlyCases = true;
    if (!consent) {
      setFormError('Please tick the consent box so our team can contact you.');
      return false;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        toast.error('Please fill in all required fields.');
      }
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!validateStep2()) {
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    // Parse doctor name into first and last name for backward-compatibility with backend
    const nameParts = doctorName.trim().split(/\s+/);
    const firstName = nameParts[0] || 'Doctor';
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : 'Doctor';

    // Compile comprehensive notes for the backend
    const extraInfo = [
      role ? `Role: ${role}` : '',
      city ? `City: ${city}` : '',
      zip ? `ZIP: ${zip}` : '',
      heartlandOffice ? `Heartland Office: ${heartlandOffice}` : '',
      monthlyCases ? `Monthly Case Volume: ${monthlyCases}` : '',
      scanner ? `Scanner: ${scanner}` : '',
      currentLab ? `Current Lab: ${currentLab}` : '',
      painPoint ? `Biggest Lab Frustration: ${painPoint}` : '',
      notes.trim() ? `Notes: ${notes.trim()}` : '',
    ].filter(Boolean).join('\n');

    try {
      const res = await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          practice: practice.trim(),
          phone: phone.trim(),
          email: email.trim(),
          state,
          callTime: callTime || 'Anytime',
          helpWith: caseTypes.length > 0 ? caseTypes : ['General inquiry'],
          notes: extraInfo,
          marketingConsent: consent,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit request');
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      const msg = err.message || 'We could not send your details. Please check your connection and try again.';
      setFormError(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white text-[#374263] min-h-screen">
      <JsonLd data={contacts} />
      <Toaster position="top-right" />

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(460px,44%)_1fr] min-h-screen">
        
        {/* ============ Left Side Banner ============ */}
        <aside 
          className="relative lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-[#07101f] text-white flex flex-col justify-between"
          style={{
            background: 'radial-gradient(700px 420px at 10% 0%,#13245a 0%,transparent 60%), radial-gradient(600px 500px at 100% 100%,#0f2a6b 0%,transparent 55%), #07101f',
          }}
          aria-label="Synergy 3D — VIP Heartland Direct Lab"
        >
          {/* Background Crown Overlay */}
          <div 
            className="absolute top-0 right-0 w-[80%] lg:w-[68%] h-[62%] bg-no-repeat bg-cover bg-right-top pointer-events-none opacity-80 lg:opacity-95 z-0"
            style={{
              backgroundImage: 'url(/images/why-wait-banner.jpg)',
              WebkitMaskImage: 'radial-gradient(120% 100% at 100% 0%, #000 45%, transparent 78%)',
              maskImage: 'radial-gradient(120% 100% at 100% 0%, #000 45%, transparent 78%)',
            }}
            role="img" 
            aria-label="A milled ceramic crown held in tweezers in front of a milling machine"
          />

          <div className="relative z-10 flex flex-col min-h-full px-6 sm:px-10 pt-8 lg:pt-10 pb-0">
            {/* Logo */}
            <Link href="/" className="font-extrabold text-2xl lg:text-[28px] tracking-[0.16em] leading-none whitespace-nowrap text-white">
              SYNERGY <span className="text-[#3cc6f5]">3D</span>
            </Link>
            <div className="w-[62%] max-w-[330px] h-[1px] bg-gradient-to-r from-[#5b9aff]/60 to-transparent mt-3.5" />

            {/* WHY WAIT? */}
            <h2 className="mt-8 lg:mt-14 font-black text-6xl sm:text-7xl lg:text-[100px] leading-[0.88] tracking-[-0.025em] text-white drop-shadow-[0_6px_30px_rgba(0,0,0,0.45)]">
              WHY
              <span className="block bg-gradient-to-b from-[#7fe0ff] via-[#2fb7f2] to-[#1e8ff0] bg-clip-text text-transparent drop-shadow-[0_8px_24px_rgba(47,183,242,0.35)]">
                WAIT?
              </span>
            </h2>
            <div className="w-[62%] h-[2px] mt-2.5 bg-gradient-to-r from-transparent via-[#5fd3ff] to-transparent shadow-[0_0_18px_2px_rgba(95,211,255,0.6)]" />

            {/* Claim + Diamond Badge */}
            <div className="flex items-center justify-between gap-3.5 mt-6 lg:mt-9">
              <div>
                <h3 className="text-white font-extrabold text-lg sm:text-xl lg:text-[22px] leading-[1.15] uppercase tracking-[-0.005em]">
                  Your cases back in<br />
                  <b className="text-[#3cc6f5] font-black text-[1.3em]">5 days</b> or less.
                </h3>
                <p className="text-[#dce5f7] text-xs sm:text-sm mt-2">
                  And a lab that picks up when you call.
                </p>
              </div>

              {/* Diamond Badge */}
              <div 
                className="shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-full border-[3px] border-[#c9d2e6] shadow-[0_0_0_5px_rgba(201,210,230,0.18),0_10px_30px_rgba(0,0,0,0.5),inset_0_0_18px_rgba(107,140,255,0.3)] flex flex-col items-center justify-center text-center p-1"
                style={{
                  background: 'radial-gradient(circle at 50% 35%, #16244f 0%, #0a1330 70%)',
                }}
              >
                <svg className="w-5 h-5 text-[#e6ecfb] mb-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
                  <path d="M6 3h12l4 6-10 12L2 9z"/><path d="M2 9h20M9 3l-2 6 5 12 5-12-2-6"/>
                </svg>
                <b className="text-[11px] sm:text-[13px] font-extrabold tracking-[0.03em] text-white">DIAMOND</b>
                <small className="text-[6.5px] sm:text-[7.5px] font-semibold tracking-[0.12em] text-[#c3cde4] uppercase leading-tight">— TRUSTED LAB —</small>
                <i className="not-italic text-[#3cc6f5] text-[7.5px] tracking-[2px] mt-0.5">★★★★★</i>
              </div>
            </div>

            {/* Feature Cards 2x2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 lg:mt-8 mb-6">
              {[
                {
                  title: 'Reliable turnaround',
                  desc: 'Cases back when promised. No chasing. No delays.',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" className="w-[50%] h-[50%] stroke-[#3cc6f5]">
                      <circle cx="13" cy="12" r="8"/><path d="M13 8v4l3 2M2 9h3M1 12h4M2 15h3"/>
                    </svg>
                  ),
                },
                {
                  title: 'Real people. Real support.',
                  desc: 'When you call, you reach someone. Direct help when you need it.',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[50%] h-[50%] stroke-[#3cc6f5]">
                      <path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/><path d="M19 20a4 4 0 0 1-4 2h-2"/>
                    </svg>
                  ),
                },
                {
                  title: 'Expertise that delivers',
                  desc: 'Skilled technicians. Consistent results. Precision in every case.',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[50%] h-[50%] stroke-[#3cc6f5]">
                      <path d="M7 3c-2.5 0-4 2-4 4.5 0 3 1.5 5 2 8 .4 2.4.8 5.5 2.3 5.5 1.6 0 1.5-4 2.2-6 .3-.9.8-1.3 2.5-1.3s2.2.4 2.5 1.3c.7 2 .6 6 2.2 6 1.5 0 1.9-3.1 2.3-5.5.5-3 2-5 2-8C21 5 19.5 3 17 3c-2 0-3 1-5 1S9 3 7 3z"/>
                    </svg>
                  ),
                },
                {
                  title: 'Quality you can trust',
                  desc: 'Premium materials. Reliable results. Quality you can count on.',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[50%] h-[50%] stroke-[#3cc6f5]">
                      <path d="M12 2l8 3v6c0 5-3.4 9.4-8 11-4.6-1.6-8-6-8-11V5z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>
                    </svg>
                  ),
                },
              ].map((feat, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-[10px] border border-[#5fd3ff]/25 bg-gradient-to-b from-[#13245a]/55 to-[#07101f]/60 shadow-[inset_0_0_22px_rgba(47,183,242,0.06)]"
                >
                  <div className="shrink-0 w-10 h-10 rounded-full border-[1.5px] border-[#5fd3ff]/70 flex items-center justify-center shadow-[0_0_14px_rgba(47,183,242,0.35),inset_0_0_10px_rgba(47,183,242,0.2)]">
                    {feat.icon}
                  </div>
                  <div>
                    <h4 className="text-[11px] font-extrabold text-[#3cc6f5] uppercase tracking-[0.01em] leading-tight mb-1">
                      {feat.title}
                    </h4>
                    <p className="text-[11px] text-[#d3dcef] leading-snug">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom VIP Strip */}
            <div className="-mx-6 sm:-mx-10 mt-auto px-6 sm:px-10 py-3.5 flex items-center justify-between gap-3 bg-[#040a15] border-t border-[#5fd3ff]/20 text-xs">
              <span className="font-extrabold uppercase leading-tight text-[11px] tracking-[0.02em] text-white">
                VIP Heartland<br />Direct Lab
              </span>
              <Link href="/" className="flex items-center gap-1.5 text-[#dce5f7] hover:text-white font-medium text-xs">
                <svg className="w-4 h-4 stroke-[#3cc6f5]" viewBox="0 0 24 24" fill="none" strokeWidth="1.6">
                  <circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.8 3.8 5.8 3.8 9s-1.3 6.2-3.8 9c-2.5-2.8-3.8-5.8-3.8-9S9.5 5.8 12 3z"/>
                </svg>
                synergy3d.net
              </Link>
              <a href="tel:+18666246522" className="flex items-center gap-1.5 text-[#dce5f7] hover:text-white font-medium text-xs">
                <svg className="w-4 h-4 stroke-[#3cc6f5]" viewBox="0 0 24 24" fill="none" strokeWidth="1.6">
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>
                </svg>
                866-624-6522
              </a>
              <span className="flex items-center gap-2 font-extrabold uppercase leading-tight text-[10.5px] text-white">
                <svg className="w-7 h-7 rounded-full shrink-0" viewBox="0 0 40 40" aria-hidden="true">
                  <defs><clipPath id="usa-flag-c"><circle cx="20" cy="20" r="20"/></clipPath></defs>
                  <g clipPath="url(#usa-flag-c)">
                    <rect width="40" height="40" fill="#fff"/>
                    <g fill="#c8102e">
                      <rect y="0" width="40" height="3.1"/>
                      <rect y="6.2" width="40" height="3.1"/>
                      <rect y="12.4" width="40" height="3.1"/>
                      <rect y="18.6" width="40" height="3.1"/>
                      <rect y="24.8" width="40" height="3.1"/>
                      <rect y="31" width="40" height="3.1"/>
                      <rect y="37.2" width="40" height="3.1"/>
                    </g>
                    <rect width="19" height="21.7" fill="#1d3b8a"/>
                    <g fill="#fff">
                      <circle cx="4" cy="4" r="1"/><circle cx="9.5" cy="4" r="1"/><circle cx="15" cy="4" r="1"/>
                      <circle cx="6.7" cy="8" r="1"/><circle cx="12.2" cy="8" r="1"/><circle cx="4" cy="12" r="1"/>
                      <circle cx="9.5" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="6.7" cy="16" r="1"/><circle cx="12.2" cy="16" r="1"/>
                    </g>
                  </g>
                </svg>
                Made in<br />America
              </span>
            </div>
          </div>
        </aside>

        {/* ============ Right Main Column ============ */}
        <main className="relative px-6 sm:px-12 lg:px-16 py-10 lg:py-16 bg-white text-[#374263]">
          
          {/* Top corner phone link */}
          <div className="flex justify-end mb-8">
            <a href="tel:+18666246522" className="inline-flex items-center gap-2 text-xs font-bold text-[#0a1530] hover:underline">
              <svg className="w-4 h-4 text-[#0a1530]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>
              </svg>
              866-MAINLAB (866-624-6522)
            </a>
          </div>

          <div className="max-w-[640px] mx-auto">
            
            {/* Form Wrap or Thank You State */}
            {!submitted ? (
              <div id="formWrap">
                <div className="mb-8">
                  <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#0a1530] leading-snug">
                    Tell us about{' '}
                    <span className="font-serif italic text-[#1e56d9]">
                      your practice.
                    </span>
                  </h1>
                  <p className="text-sm text-[#374263] mt-3.5 leading-relaxed font-sans">
                    Share your practice details and a real person from our Heartland team will be in touch within one business day.
                  </p>
                </div>

                {/* Stepper Indicator */}
                <div className="flex items-center gap-3.5 mb-7 text-xs font-bold tracking-[0.12em] uppercase text-[#6b7a99]">
                  <div className="flex gap-1.5">
                    <span className={`block w-9 h-[3px] rounded-full transition-colors ${step >= 1 ? 'bg-[#1e56d9]' : 'bg-[#e3e8f2]'}`} />
                    <span className={`block w-9 h-[3px] rounded-full transition-colors ${step === 2 ? 'bg-[#1e56d9]' : 'bg-[#e3e8f2]'}`} />
                  </div>
                  <span>
                    {step === 1 ? 'Step 1 of 2 · Contact details' : 'Step 2 of 2 · Your cases'}
                  </span>
                </div>

                {/* Form */}
                <form onSubmit={handleNext} noValidate className="flex flex-col gap-5">
                  
                  {/* ====== STEP 1 ====== */}
                  {step === 1 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                      {/* Doctor Name */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[12.5px] font-bold text-[#0a1530] tracking-[0.03em]">
                          Doctor Name <span className="text-[#0a1530]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Dr. Full Name"
                          value={doctorName}
                          onChange={(e) => { setDoctorName(e.target.value); clearError('doctorName'); }}
                          className={`h-[41px] px-3 text-sm text-[#0a1530] bg-white border rounded-[2px] transition-all outline-none ${
                            errors.doctorName ? 'border-[#c2410c] focus:border-[#c2410c]' : 'border-[#a9b4cc] focus:border-[#1e56d9] focus:ring-2 focus:ring-[#1e56d9]/20'
                          }`}
                        />
                        {errors.doctorName && <span className="text-[11.5px] text-[#c2410c]">Enter the doctor’s name.</span>}
                      </div>

                      {/* Practice Name */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[12.5px] font-bold text-[#0a1530] tracking-[0.03em]">
                          Practice Name <span className="text-[#0a1530]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Practice Name"
                          value={practice}
                          onChange={(e) => { setPractice(e.target.value); clearError('practice'); }}
                          className={`h-[41px] px-3 text-sm text-[#0a1530] bg-white border rounded-[2px] transition-all outline-none ${
                            errors.practice ? 'border-[#c2410c] focus:border-[#c2410c]' : 'border-[#a9b4cc] focus:border-[#1e56d9] focus:ring-2 focus:ring-[#1e56d9]/20'
                          }`}
                        />
                        {errors.practice && <span className="text-[11.5px] text-[#c2410c]">Enter your practice name.</span>}
                      </div>

                      {/* Phone Number */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[12.5px] font-bold text-[#0a1530] tracking-[0.03em]">
                          Phone Number <span className="text-[#0a1530]">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="(555) 000-0000"
                          value={phone}
                          onChange={handlePhoneChange}
                          className={`h-[41px] px-3 text-sm text-[#0a1530] bg-white border rounded-[2px] transition-all outline-none ${
                            errors.phone ? 'border-[#c2410c] focus:border-[#c2410c]' : 'border-[#a9b4cc] focus:border-[#1e56d9] focus:ring-2 focus:ring-[#1e56d9]/20'
                          }`}
                        />
                        {errors.phone && <span className="text-[11.5px] text-[#c2410c]">Enter a valid 10-digit phone number.</span>}
                      </div>

                      {/* Email id */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[12.5px] font-bold text-[#0a1530] tracking-[0.03em]">
                          Email id <span className="text-[#0a1530]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="you@practice.com"
                          value={email}
                          onChange={(e) => { setEmail(e.target.value); clearError('email'); }}
                          className={`h-[41px] px-3 text-sm text-[#0a1530] bg-white border rounded-[2px] transition-all outline-none ${
                            errors.email ? 'border-[#c2410c] focus:border-[#c2410c]' : 'border-[#a9b4cc] focus:border-[#1e56d9] focus:ring-2 focus:ring-[#1e56d9]/20'
                          }`}
                        />
                        {errors.email && <span className="text-[11.5px] text-[#c2410c]">Enter a valid email address.</span>}
                      </div>

                      {/* Your Role */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[12.5px] font-bold text-[#0a1530] tracking-[0.03em]">
                          Your Role <span className="text-[#0a1530]">*</span>
                        </label>
                        <select
                          required
                          value={role}
                          onChange={(e) => { setRole(e.target.value); clearError('role'); }}
                          className={`h-[41px] px-3 text-sm text-[#0a1530] bg-white border rounded-[2px] transition-all outline-none cursor-pointer ${
                            errors.role ? 'border-[#c2410c] focus:border-[#c2410c]' : 'border-[#a9b4cc] focus:border-[#1e56d9] focus:ring-2 focus:ring-[#1e56d9]/20'
                          }`}
                        >
                          <option value="">Select your role</option>
                          {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                        {errors.role && <span className="text-[11.5px] text-[#c2410c]">Choose your role.</span>}
                      </div>

                      {/* State */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[12.5px] font-bold text-[#0a1530] tracking-[0.03em]">
                          State <span className="text-[#0a1530]">*</span>
                        </label>
                        <select
                          required
                          value={state}
                          onChange={(e) => { setState(e.target.value); clearError('state'); }}
                          className={`h-[41px] px-3 text-sm text-[#0a1530] bg-white border rounded-[2px] transition-all outline-none cursor-pointer ${
                            errors.state ? 'border-[#c2410c] focus:border-[#c2410c]' : 'border-[#a9b4cc] focus:border-[#1e56d9] focus:ring-2 focus:ring-[#1e56d9]/20'
                          }`}
                        >
                          <option value="">Select your state</option>
                          {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        {errors.state && <span className="text-[11.5px] text-[#c2410c]">Choose your state.</span>}
                      </div>

                      {/* City */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[12.5px] font-bold text-[#0a1530] tracking-[0.03em]">
                          City
                        </label>
                        <input
                          type="text"
                          placeholder="City"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="h-[41px] px-3 text-sm text-[#0a1530] bg-white border border-[#a9b4cc] rounded-[2px] transition-all outline-none focus:border-[#1e56d9] focus:ring-2 focus:ring-[#1e56d9]/20"
                        />
                      </div>

                      {/* ZIP Code */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[12.5px] font-bold text-[#0a1530] tracking-[0.03em]">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          maxLength={10}
                          placeholder="12345"
                          value={zip}
                          onChange={(e) => { setZip(e.target.value); clearError('zip'); }}
                          className={`h-[41px] px-3 text-sm text-[#0a1530] bg-white border rounded-[2px] transition-all outline-none ${
                            errors.zip ? 'border-[#c2410c] focus:border-[#c2410c]' : 'border-[#a9b4cc] focus:border-[#1e56d9] focus:ring-2 focus:ring-[#1e56d9]/20'
                          }`}
                        />
                        {errors.zip && <span className="text-[11.5px] text-[#c2410c]">Enter a 5-digit ZIP code.</span>}
                      </div>

                      {/* Are you a Heartland Dental supported office? */}
                      <div className="sm:col-span-2 flex flex-col gap-2 mt-1">
                        <span className="text-[12.5px] font-bold text-[#0a1530] tracking-[0.03em]">
                          Are you a Heartland Dental supported office? <span className="text-[#0a1530]">*</span>
                        </span>
                        <div className="grid grid-cols-2 gap-4">
                          {['Yes', 'No'].map((opt) => (
                            <button
                              type="button"
                              key={opt}
                              onClick={() => { setHeartlandOffice(opt); clearError('heartlandOffice'); }}
                              className={`h-[44px] text-center font-bold text-xs uppercase tracking-wider rounded-[2px] border transition-all cursor-pointer ${
                                heartlandOffice === opt
                                  ? 'bg-[#1e56d9] border-[#1e56d9] text-white'
                                  : 'bg-white border-[#a9b4cc] text-[#0a1530] hover:border-[#1e56d9]'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                        {errors.heartlandOffice && <span className="text-[11.5px] text-[#c2410c]">Choose Yes or No.</span>}
                      </div>
                    </div>
                  )}

                  {/* ====== STEP 2 ====== */}
                  {step === 2 && (
                    <div className="flex flex-col gap-5">
                      
                      {/* Case Types Chips */}
                      <div className="flex flex-col gap-2">
                        <span className="text-[12.5px] font-bold text-[#0a1530] tracking-[0.03em]">
                          Case Types You Send Out
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {CASE_TYPES.map((type) => {
                            const isSelected = caseTypes.includes(type);
                            return (
                              <button
                                type="button"
                                key={type}
                                onClick={() => toggleCaseType(type)}
                                className={`text-[12.5px] font-semibold border rounded-[2px] py-2 px-3.5 transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#1e56d9] border-[#1e56d9] text-white'
                                    : 'bg-white border-[#a9b4cc] text-[#0a1530] hover:border-[#1e56d9]'
                                }`}
                              >
                                {type}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                        {/* Lab Cases per Month */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[12.5px] font-bold text-[#0a1530] tracking-[0.03em]">
                            Lab Cases per Month <span className="text-[#0a1530]">*</span>
                          </label>
                          <select
                            required
                            value={monthlyCases}
                            onChange={(e) => { setMonthlyCases(e.target.value); clearError('monthlyCases'); }}
                            className={`h-[41px] px-3 text-sm text-[#0a1530] bg-white border rounded-[2px] transition-all outline-none cursor-pointer ${
                              errors.monthlyCases ? 'border-[#c2410c] focus:border-[#c2410c]' : 'border-[#a9b4cc] focus:border-[#1e56d9] focus:ring-2 focus:ring-[#1e56d9]/20'
                            }`}
                          >
                            <option value="">Select volume</option>
                            {MONTHLY_CASES.map(v => <option key={v} value={v}>{v}</option>)}
                          </select>
                          {errors.monthlyCases && <span className="text-[11.5px] text-[#c2410c]">Choose your monthly case volume.</span>}
                        </div>

                        {/* Intraoral Scanner */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[12.5px] font-bold text-[#0a1530] tracking-[0.03em]">
                            Intraoral Scanner
                          </label>
                          <select
                            value={scanner}
                            onChange={(e) => setScanner(e.target.value)}
                            className="h-[41px] px-3 text-sm text-[#0a1530] bg-white border border-[#a9b4cc] rounded-[2px] transition-all outline-none focus:border-[#1e56d9] focus:ring-2 focus:ring-[#1e56d9]/20 cursor-pointer"
                          >
                            <option value="">Select scanner</option>
                            {SCANNERS.map(sc => <option key={sc} value={sc}>{sc}</option>)}
                          </select>
                        </div>

                        {/* Current Lab */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[12.5px] font-bold text-[#0a1530] tracking-[0.03em]">
                            Current Lab
                          </label>
                          <input
                            type="text"
                            placeholder="Current lab name"
                            value={currentLab}
                            onChange={(e) => setCurrentLab(e.target.value)}
                            className="h-[41px] px-3 text-sm text-[#0a1530] bg-white border border-[#a9b4cc] rounded-[2px] transition-all outline-none focus:border-[#1e56d9] focus:ring-2 focus:ring-[#1e56d9]/20"
                          />
                        </div>

                        {/* Biggest Lab Frustration */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[12.5px] font-bold text-[#0a1530] tracking-[0.03em]">
                            Biggest Lab Frustration
                          </label>
                          <select
                            value={painPoint}
                            onChange={(e) => setPainPoint(e.target.value)}
                            className="h-[41px] px-3 text-sm text-[#0a1530] bg-white border border-[#a9b4cc] rounded-[2px] transition-all outline-none focus:border-[#1e56d9] focus:ring-2 focus:ring-[#1e56d9]/20 cursor-pointer"
                          >
                            <option value="">Select frustration</option>
                            {FRUSTRATIONS.map(f => <option key={f} value={f}>{f}</option>)}
                          </select>
                        </div>
                      </div>

                      {/* Best Time to Call */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[12.5px] font-bold text-[#0a1530] tracking-[0.03em]">
                          Best Time to Call
                        </label>
                        <select
                          value={callTime}
                          onChange={(e) => setCallTime(e.target.value)}
                          className="h-[41px] px-3 text-sm text-[#0a1530] bg-white border border-[#a9b4cc] rounded-[2px] transition-all outline-none focus:border-[#1e56d9] focus:ring-2 focus:ring-[#1e56d9]/20 cursor-pointer"
                        >
                          {CALL_TIMES.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>

                      {/* Notes / Anything We Should Know */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[12.5px] font-bold text-[#0a1530] tracking-[0.03em]">
                          Anything We Should Know?
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Upcoming cases, materials you prefer, a case you’d like us to try…"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          className="px-3 py-2.5 text-sm text-[#0a1530] bg-white border border-[#a9b4cc] rounded-[2px] transition-all outline-none focus:border-[#1e56d9] focus:ring-2 focus:ring-[#1e56d9]/20 resize-y"
                        />
                      </div>

                      {/* Consent Checkbox */}
                      <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#6b7a99] font-medium leading-relaxed mt-1 select-none">
                        <input
                          type="checkbox"
                          required
                          checked={consent}
                          onChange={(e) => { setConsent(e.target.checked); setFormError(''); }}
                          className="mt-0.5 w-4 h-4 accent-[#1e56d9] rounded cursor-pointer"
                        />
                        <span>
                          I agree that Synergy 3D may contact me by phone or email about lab services. We never share your details.
                        </span>
                      </label>

                      {/* Form Error Banner */}
                      {formError && (
                        <div className="text-xs text-[#c2410c] border-l-[3px] border-[#c2410c] px-3 py-2 bg-[#fff6f1]">
                          {formError}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Actions Buttons */}
                  <div className="flex items-center gap-3 mt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center font-bold text-sm tracking-[0.04em] h-[44px] min-w-[195px] px-8 bg-[#1e56d9] hover:bg-[#1846b8] text-white rounded-[2px] transition-all cursor-pointer shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending…
                        </span>
                      ) : step === 1 ? (
                        'Continue →'
                      ) : (
                        'Submit Request'
                      )}
                    </button>

                    {step === 2 && (
                      <button
                        type="button"
                        onClick={() => { setStep(1); setFormError(''); }}
                        className="text-sm font-semibold text-[#0a1530] hover:underline px-3 py-2 cursor-pointer"
                      >
                        ← Back
                      </button>
                    )}
                  </div>

                  <p className="text-xs text-[#6b7a99] mt-1">
                    Takes under a minute. A real person replies within one business day.
                  </p>
                </form>
              </div>
            ) : (
              /* Thank You State */
              <div className="py-12 flex flex-col items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-2xl mb-1">
                  ✓
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0a1530]">
                  Thanks, <span className="font-serif italic text-[#1e56d9]">{doctorName || 'Doctor'}</span>.
                </h2>
                <p className="text-sm text-[#374263] max-w-[440px] leading-relaxed">
                  Your details are with our Heartland team. A real person will call you within one business day.
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <a
                    href="tel:+18666246522"
                    className="inline-flex items-center justify-center font-bold text-sm h-[42px] px-8 bg-[#1e56d9] hover:bg-[#1846b8] text-white rounded-[2px] transition-all"
                  >
                    Call 866-624-6522
                  </a>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setStep(1);
                    }}
                    className="inline-flex items-center justify-center font-bold text-sm h-[42px] px-6 border border-[#a9b4cc] text-[#0a1530] hover:bg-gray-50 rounded-[2px] transition-all"
                  >
                    Submit Another Case
                  </button>
                </div>
              </div>
            )}

            {/* ====== Section: At a glance ====== */}
            <section className="mt-20 pt-10 border-t-2 border-[#1e56d9]">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-[#e3e8f2]">
                <div>
                  <b className="block font-serif text-3xl font-bold text-[#0a1530] tabular-nums">5 days</b>
                  <span className="text-xs text-[#6b7a99] leading-snug block mt-1">Cases back, or less</span>
                </div>
                <div>
                  <b className="block font-serif text-3xl font-bold text-[#0a1530] tabular-nums">&lt;30µm</b>
                  <span className="text-xs text-[#6b7a99] leading-snug block mt-1">Fit on milled work</span>
                </div>
                <div>
                  <b className="block font-serif text-3xl font-bold text-[#0a1530] tabular-nums">7 days</b>
                  <span className="text-xs text-[#6b7a99] leading-snug block mt-1">A week you can reach us</span>
                </div>
                <div>
                  <b className="block font-serif text-3xl font-bold text-[#0a1530] tabular-nums">USA</b>
                  <span className="text-xs text-[#6b7a99] leading-snug block mt-1">Made in New York</span>
                </div>
              </div>
            </section>

            {/* ====== Section: How a case moves ====== */}
            <section className="mt-16">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#1e56d9] mb-2">How a case moves</p>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0a1530] mb-6">
                From scan to seat in <em className="italic text-[#1e56d9] font-serif">five business days.</em>
              </h2>
              <ol className="flex flex-col divide-y divide-[#e3e8f2] border-t border-b border-[#e3e8f2]">
                {[
                  {
                    day: 'Day 0',
                    title: 'Send your scan',
                    desc: 'Upload from your scanner in about 60 seconds with your Rx attached, or ship impressions on a prepaid label.',
                  },
                  {
                    day: 'Day 1',
                    title: 'CAD design',
                    desc: 'We design margins, contacts and emergence profile, and flag anything that needs your input.',
                  },
                  {
                    day: 'Days 2–4',
                    title: 'Mill, stain & QC',
                    desc: 'Milled in-house in New York, shade-characterized, then checked on the model.',
                  },
                  {
                    day: 'Day 5',
                    title: 'Back at your office',
                    desc: 'Shipped with tracking so your team knows exactly when it lands.',
                  },
                ].map((item, idx) => (
                  <li key={idx} className="grid grid-cols-[85px_1fr] gap-4 py-4.5">
                    <span className="text-[11.5px] font-bold tracking-[0.14em] uppercase text-[#1e56d9] pt-0.5">
                      {item.day}
                    </span>
                    <div>
                      <h3 className="font-serif text-base font-bold text-[#0a1530] mb-1">{item.title}</h3>
                      <p className="text-xs text-[#6b7a99] leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-5 text-xs text-[#6b7a99]">
                <b className="text-[#0a1530] font-bold">Scanners we accept:</b> iTero, 3Shape TRIOS, Medit, Carestream, Dexis, Sirona, Planmeca
              </p>
            </section>

            {/* ====== Section: What we make ====== */}
            <section className="mt-16">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#1e56d9] mb-2">What we make</p>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0a1530] mb-6">
                The restorations Heartland offices <em className="italic text-[#1e56d9] font-serif">send most.</em>
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {FEATURED_PRODUCTS.map((prod) => (
                  <div
                    key={prod.id}
                    className="bg-blue-pale/40 border border-blue-200/50 hover:border-blue-300/80 rounded-2xl overflow-hidden hover:shadow-premium hover:-translate-y-1.5 hover:bg-blue-pale/60 transition-all duration-300 flex flex-col group relative"
                  >
                    <Link href={prod.href} className="absolute inset-0 z-10" aria-label={`View ${prod.name}`} />
                    
                    {/* Product Image */}
                    <div className="aspect-[4/3] bg-gradient-to-b from-white to-blue-pale/35 border-b border-blue-200/50 flex items-center justify-center p-4 relative overflow-hidden shrink-0">
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(224,234,255,0.5)_0%,transparent_75%)]" />
                      <div className="w-full h-full relative transition-transform duration-300 group-hover:scale-105">
                        <Image
                          src={prod.img}
                          alt={prod.name}
                          fill
                          className="object-contain p-2"
                          sizes="(max-width: 640px) 100vw, 33vw"
                        />
                      </div>
                      {/* Turnaround Badge */}
                      <span className="absolute top-3 right-3 text-[10px] font-bold bg-white/95 backdrop-blur-xs text-[#0a1530] px-2 py-0.5 rounded-full border border-blue-200/70 shadow-xs">
                        {prod.turnaround}
                      </span>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex flex-col flex-grow">
                      <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#1e56d9] mb-1.5">
                        {prod.cat}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-[#0a1530] mb-2 leading-snug group-hover:text-[#1e56d9] transition-colors">
                        {prod.name}
                      </h3>
                      <p className="text-xs text-[#6b7a99] leading-relaxed mb-4 flex-grow">
                        {prod.desc}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold text-[#1e56d9] group-hover:gap-2.5 transition-all">
                        View details <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ====== Section: Bottom CTA ====== */}
            <section className="mt-16 bg-gradient-to-r from-[#07101f] via-[#0d2252] to-[#07101f] text-white p-8 sm:p-10 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1">
                  LET’S <em className="italic text-[#5fd3ff] font-serif">TALK</em>
                </h2>
                <p className="text-xs text-[#8a9abf]">
                  866-MAINLAB · Ready for a better lab experience?
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="font-bold text-xs uppercase tracking-wider h-[38px] px-6 bg-[#1e56d9] hover:bg-[#1846b8] text-white rounded-[2px] transition-all cursor-pointer"
                >
                  Get in touch
                </button>
                <a
                  href="tel:+18666246522"
                  className="inline-flex items-center justify-center font-bold text-xs uppercase tracking-wider h-[38px] px-5 border border-white/40 hover:bg-white/10 text-white rounded-[2px] transition-all"
                >
                  Call 866-624-6522
                </a>
              </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}
