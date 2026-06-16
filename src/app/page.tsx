'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Target, RefreshCw, Users, Activity, ShieldCheck, Play, ArrowRight, ArrowUpRight, MapPin, Star, ArrowDown, User, Home as HomeIcon, Building2, Globe } from 'lucide-react';
import whySynergyImg from '@/app/assets/image.png';
import imgZirconia from '@/app/assets/products/zirconia-crown.png';
import imgAllOnX from '@/app/assets/products/all-on-x-hybrid.png';
import imgEmax from '@/app/assets/products/emax-restoration.png';
import imgNightGuard from '@/app/assets/products/night-gaurds.png';
import imgSurgicalGuide from '@/app/assets/products/surgical-guides.png';
import imgPFM from '@/app/assets/products/pmf.png';
import imgModels from '@/app/assets/products/printed-models.png';

const renderIcon = (type: string, className = "w-5 h-5") => {
  switch (type) {
    case 'clock':
      return <Clock className={className} strokeWidth={2} />;
    case 'target':
      return <Target className={className} strokeWidth={2} />;
    case 'refresh':
      return <RefreshCw className={className} strokeWidth={2} />;
    case 'users':
      return <Users className={className} strokeWidth={2} />;
    case 'pulse':
      return <Activity className={className} strokeWidth={2} />;
    case 'shield':
      return <ShieldCheck className={className} strokeWidth={2} />;
    default:
      return null;
  }
};

const allProducts = [
  {
    id: 'zirconia',
    name: 'Zirconia Crowns',
    cat: 'Crown & Bridge',
    label: 'ZIRCONIA',
    desc: 'High-strength, natural-looking zirconia crowns. Sub-30µm precision guaranteed on every single case.',
    linkText: 'Explore →',
    linkUrl: '/products/zirconia',
    img: imgZirconia,
  },
  {
    id: 'allonx',
    name: 'All-on-X Hybrids',
    cat: 'Implant Solutions',
    label: 'ALL-ON-X',
    desc: 'Full-arch implant restorations — All-on-4, All-on-6, and custom hybrid frameworks milled in-house.',
    linkText: 'Explore →',
    linkUrl: '/products/allonx',
    img: imgAllOnX,
  },
  {
    id: 'emax',
    name: 'e.max & PFM',
    cat: 'Ceramics',
    label: 'E.MAX CERAMIC',
    desc: 'Lithium disilicate and porcelain-fused-to-metal for unmatched aesthetics in every case.',
    linkText: 'Explore →',
    linkUrl: '/products/emax',
    img: imgEmax,
  },
  {
    id: 'nightguard',
    name: 'Splints & Guards',
    cat: 'Appliances',
    label: 'NIGHT GUARD',
    desc: 'Custom-milled night guards and splints for bruxism and TMJ protection.',
    linkText: 'Explore →',
    linkUrl: '/products/nightguard',
    img: imgNightGuard,
  },
  {
    id: 'surgicalguide',
    name: 'Surgical Guides',
    cat: 'Implant Solutions',
    label: 'SURGICAL GUIDE',
    desc: 'CBCT-based digitally planned surgical guides for precise implant placement.',
    linkText: 'Explore →',
    linkUrl: '/products/surgicalguide',
    img: imgSurgicalGuide,
  },
  {
    id: 'pfmcrown',
    name: 'PFM Crowns',
    cat: 'Ceramics',
    label: 'PFM CROWN',
    desc: 'Porcelain-fused-to-metal crowns offering durable strength with excellent aesthetics.',
    linkText: 'Explore →',
    linkUrl: '/products/pfmcrown',
    img: imgPFM,
  },
  {
    id: 'models',
    name: 'Printed Models & Dies',
    cat: 'Models & Dies',
    label: 'MODELS',
    desc: 'High-accuracy 3D-printed study models for planning and communication.',
    linkText: 'Explore →',
    linkUrl: '/products/models',
    img: imgModels,
  }
];

const renderProductCard = (p: any, isCarousel = false) => {
  return (
    <div key={p.id} className={`bg-white border border-[#dde6f5] rounded-xl overflow-hidden hover:shadow-premium hover:-translate-y-1.5 transition-all duration-300 flex flex-col group ${isCarousel ? 'w-[280px] shrink-0 snap-start scroll-mx-8' : 'w-full'}`}>
      {/* Image/Drawing Box */}
      <div className="aspect-[4/2.3] bg-gradient-to-b from-white to-[#f7f9ff] border-b border-[#dde6f5] flex flex-col items-center justify-center relative p-8">
        {/* Top right indicator badge */}
        <div className="absolute top-5 right-5">
          <div className="w-8 h-8 rounded-full border border-blue-default/20 bg-white text-blue-default flex items-center justify-center hover:bg-blue-default hover:text-white hover:border-blue-default transition-all duration-300">
            <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
          </div>
        </div>
        {/* Product image */}
        <div className="flex-grow flex items-center justify-center mt-3 relative w-full">
          <Image src={p.img} alt={p.name} fill className="object-contain" sizes={isCarousel ? "(max-width: 768px) 100vw, 33vw" : "(max-width: 768px) 100vw, 50vw"} />
        </div>
        {/* Subtitle label */}
        <span className="text-[10px] font-bold tracking-[0.2em] text-blue-default/45 uppercase mt-3">{p.label}</span>
      </div>

      {/* Info Box */}
      <div className="p-6.5 flex flex-col flex-grow">
        <span className="text-[10px] font-bold tracking-[0.16em] uppercase text-blue-600 mb-2">{p.cat}</span>
        <h3 className="font-serif text-lg font-bold text-[#0a1530] mb-2 leading-snug">{p.name}</h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-5">{p.desc}</p>
        <Link href={p.linkUrl} className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-blue-default hover:text-blue-bright transition-all">
          {p.linkText}
        </Link>
      </div>
    </div>
  );
};

export default function Home() {
  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Dynamic featured testimonials state
  const [featuredTestimonials, setFeaturedTestimonials] = useState<any[]>([
    { 
      videoId: 'dQw4w9WgXcQ', 
      name: 'Dr. Sarah Chen', 
      role1: 'Park Avenue', 
      role2: 'Dental, NYC', 
      quote: '"The fit accuracy is unreal. I’ve cut my chair-time adjustments by 80% since switching."', 
      result: '80% chair time', 
      resultType: 'down',
      duration: '1:24', 
      imgPath: '/images/stats-turnaround.png'
    },
    { 
      videoId: 'dQw4w9WgXcQ', 
      name: 'Dr. Michael Torres, DMD', 
      role1: 'Bright Smiles DSO', 
      role2: '12 Locations', 
      quote: '"12 locations, all on Synergy 3D. Their digital workflow is miles ahead of any traditional lab."', 
      result: '94% remakes', 
      resultType: 'down',
      duration: '2:08', 
      imgPath: '/images/stats-accuracy.png'
    },
    { 
      videoId: 'dQw4w9WgXcQ', 
      name: 'Dr. Roy Park', 
      role1: 'Family Dental', 
      role2: 'Care, NJ', 
      quote: '"22 years in dentistry — this is the most reliable lab partner I’ve ever had. Under 1% remakes."', 
      result: '0 remakes · 6 mo', 
      resultType: 'check',
      duration: '1:52', 
      imgPath: '/images/stats-remake.png'
    }
  ]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch('/api/customers/featured');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setFeaturedTestimonials(data);
          }
        }
      } catch (error) {
        console.error('Error fetching featured testimonials:', error);
      }
    };
    fetchFeatured();
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Trigger global video modal
  const playVideo = (videoId: string, ep: string, title: string, guest: string) => {
    window.dispatchEvent(
      new CustomEvent('open-video-modal', {
        detail: { videoId, ep, title, guest },
      })
    );
  };

  const triggerShipping = () => {
    window.dispatchEvent(new Event('open-shipping-modal'));
  };

  const faqs = [
    {
      q: 'What is Synergy 3D?',
      a: 'Synergy 3D is a New York-based digital dental laboratory offering precision restorations engineered with CAD/CAM technology, in-house milling, and FDA-cleared materials — delivered in 5 days or less.'
    },
    {
      q: 'What are the benefits of a digital dental lab?',
      a: 'Digital labs eliminate manual impression errors, produce more consistent restorations, reduce remake rates, and dramatically speed up turnaround. With Synergy 3D, you get sub-30µm fit accuracy on every case.'
    },
    {
      q: 'Which scanners are compatible?',
      a: "We accept files from all major intraoral scanners including iTero, 3Shape, Medit, Carestream, Dexis, Sirona, Planmeca, and Align. Contact us if you use a different scanner and we'll verify compatibility."
    },
    {
      q: 'How does the submission process work?',
      a: 'Scan your patient, upload the .STL or .DCM file to our secure portal, complete the case form, and submit. Our team receives it instantly and begins design the same day — no shipping, no waiting.'
    },
    {
      q: 'What is your remake policy?',
      a: "We offer a full remake guarantee on any restoration that doesn't meet clinical fit standards. Our <1% remake rate reflects our precision, but if something isn't right, we fix it at no cost to you."
    },
    {
      q: 'How does Synergy 3D compare to other labs?',
      a: "We combine in-house milling, expert technicians, premium materials, and a fully digital workflow to deliver superior accuracy at competitive pricing — 4.2-day average turnaround, <1% remake rate."
    }
  ];

  return (
    <div>
      {/* ── HERO SECTION ── */}
      <section className="relative min-h-[90vh] overflow-hidden flex flex-col items-center justify-center text-center px-8 md:px-8 py-12 md:py-32">
        <div className="absolute inset-0 z-0">
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover object-center">
            <source src="/hero-bg_trim.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 z-[1] bg-gradient-to-b from-navy/68 via-navy/48 to-navy/75" />
          <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_85%_50%_at_50%_30%,rgba(30,86,217,0.22)_0%,transparent_70%)]" />
        </div>

        <div className="absolute inset-0 z-[2] pointer-events-none bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)] bg-[size:50px_50px]" />

        <div className="relative z-10 flex flex-col items-center max-w-[900px]">
          <div className="inline-flex items-center gap-2 bg-[#3A5486] border border-blue-glow/35 text-blue-glow text-[10px] font-semibold tracking-widest uppercase px-4.5 py-1 rounded-full mb-8 backdrop-blur-md animate-fade-up">
            <span className="w-1.5 h-1.5 bg-blue-glow rounded-full animate-pulse-custom" />
            New York's Premier Digital Dental Lab
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight text-white mb-6 leading-[1.04] drop-shadow-md">
            Your one-stop<br />digital <em className="italic text-blue-glow font-normal">dental lab.</em>
          </h1>
          <p className="text-[16px] text-white/78 max-w-[520px] leading-relaxed mb-11 drop-shadow">
            Precision crowns and restorations — engineered with CAD/CAM, milled in-house, and delivered in five days flat.
          </p>
          <div className="flex flex-wrap gap-3.5 justify-center">
            <a href="https://synergy.greatlab.io/login" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-default hover:bg-blue-bright text-white font-semibold py-4 px-8 rounded-lg text-[13px] transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer h-12 w-48 text-center flex items-center justify-center">
              Send Digital Scan →
            </a>
            <button
              onClick={() => playVideo('dQw4w9WgXcQ', 'Intro', 'Precision CAD/CAM Dental Lab', 'Enrico Romano')}
              className="inline-block bg-white/10 hover:bg-white/18 text-white font-semibold py-3.5 px-7 rounded-lg text-[13px] border border-white/20 backdrop-blur-md transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer w-48"
            >
              Watch how it works
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2.5">
          <span className="text-[0.68rem] text-white/40 tracking-widest uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-white/30 animate-scroll-bob" />
        </div>
      </section>

      {/* ── SCANNERS INTEGRATION RIBBON ── */}
      <section className="bg-white border-b border-border-light py-12 md:py-14 text-navy-text">
        <div className="max-w-[1140px] mx-auto px-8 md:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-[11px] text-gray-500 font-medium tracking-[0.04em] mb-2.5">— Scanners we work with</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#0a1530] leading-tight">
                Plug into the scanner you already own.
              </h2>
            </div>
            <Link href="/integrations" className="text-[0.88rem] font-semibold text-navy-text border-b border-navy-text hover:text-blue-default hover:border-blue-default transition-all whitespace-nowrap pb-1">
              See integrations →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 border border-border-light rounded-xl overflow-hidden divide-x divide-y md:divide-y-0 divide-border-light">
            {['iTero', '3Shape', 'Medit', 'Carestream', 'Dexis', 'Sirona', 'Planmeca', 'Align'].map((sc, i) => {
              const models = [
                'Element 5D / Lumina', 'TRIOS 4 / 5', 'i700 / i900', 'CS 3700 / 3800',
                'IS 3800W', 'Primescan', 'Emerald S', 'Invisalign Outcome'
              ];
              return (
                <div key={i} className="p-6 flex flex-col justify-center hover:bg-gray-50 transition-colors">
                  <div className="text-[1rem] font-bold text-navy-text mb-1">{sc}</div>
                  <div className="text-[0.78rem] text-gray-500">{models[i]}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── EXECUTIVE STATS ── */}
      <section className="bg-navy py-12 md:py-24 text-white">
        <div className="max-w-[1140px] mx-auto px-8 md:px-16">
          <div className="text-center max-w-[600px] mx-auto mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-blue" />
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-blue-glow">Trusted by dental professionals</span>
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-blue" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight mb-3">Proven performance. Real impact.</h2>
            <p className="text-sm text-muted-dark leading-relaxed">
              Numbers that reflect our commitment to quality, accuracy, and client success.
            </p>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory pt-4 pb-12 -mx-8 px-8 sm:mx-0 sm:px-0 sm:pt-0 sm:pb-0 sm:grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Start spacer for scroll spacing on mobile */}
            <div className="w-1 shrink-0 sm:hidden" />
            {[
              {
                num: '4.2',
                suffix: 'd',
                label: 'Avg. Turnaround',
                desc: 'Fast, reliable delivery you can count on.',
                iconType: 'clock',
                imgPath: '/images/stats-turnaround.png'
              },
              {
                num: '99',
                suffix: '%',
                label: 'Fit Accuracy',
                desc: 'Precision that ensures better patient outcomes.',
                iconType: 'target',
                imgPath: '/images/stats-accuracy.png'
              },
              {
                num: '<1',
                suffix: '%',
                label: 'Remake Rate',
                desc: 'Consistently low remakes driven by attention to detail.',
                iconType: 'refresh',
                imgPath: '/images/stats-remake.png'
              },
              {
                num: '500',
                suffix: '+',
                label: 'Partner Practices',
                desc: 'Growing together with labs and clinics nationwide.',
                iconType: 'users',
                imgPath: '/images/stats-practices.png'
              },
            ].map((st, i) => (
              <div key={i} className="reveal bg-navy-card border border-border-dark hover:border-blue-glow/20 rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl w-[280px] sm:w-auto shrink-0 snap-start scroll-mx-8">
                {/* 3D Image Container */}
                <div className="w-full aspect-[1.35/1] bg-gradient-to-b from-[#0c1b3d] to-[#050b1a] rounded-xl border border-border-dark/30 relative overflow-hidden flex items-center justify-center mb-6 group/img shadow-inner">
                  {/* Top-left small icon badge inside the image box */}
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-[#0d2149]/40 border border-blue-default/20 flex items-center justify-center backdrop-blur-sm text-blue-glow z-10">
                    {renderIcon(st.iconType, "w-4 h-4")}
                  </div>

                  {/* Render the 3D Image */}
                  <div className="relative w-full h-full">
                    <Image
                      src={st.imgPath}
                      alt={st.label}
                      fill
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="object-cover opacity-90 group-hover/img:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Lower Circle Icon Badge */}
                <div className="w-10 h-10 rounded-full bg-[#0d2149]/40 border border-blue-default/30 flex items-center justify-center mb-4 text-blue-glow">
                  {renderIcon(st.iconType, "w-4 h-4")}
                </div>

                {/* Stat Number */}
                <div className="flex flex-col items-center">
                  <div className="font-serif text-5xl font-bold text-white mb-2.5 tracking-tight flex items-baseline leading-none">
                    {st.num}
                    <span className="text-blue-glow font-bold text-4xl ml-1">{st.suffix}</span>
                  </div>

                   {/* Short blue horizontal line */}
                <div className="w-7 h-[2px] bg-gradient-to-r from-blue to-blue-glow rounded-full mb-3.5" />
                

                {/* Label */}
                <h4 className="text-[10px] font-semibold tracking-[0.14em] uppercase text-white mb-2">{st.label}</h4>

                {/* Description */}
                <p className="text-xs text-muted-dark text-center leading-relaxed">{st.desc}</p>
                </div>
              </div>
            ))}
            {/* End spacer for scroll spacing on mobile */}
            <div className="w-1 shrink-0 sm:hidden" />
          </div>
        </div>
      </section>

      {/* ── WHY SYNERGY ── */}
      <section className="bg-gray-100 py-12 md:py-24 text-navy-text">
        <div className="max-w-[1140px] mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col">
            <div className="flex items-center gap-2.5 mb-5">
              {/* Short blue horizontal line */}
                <div className="w-5 h-[1px] bg-blue-600 rounded-full" />
              <span className="text-[11px] text-blue-600 font-semibold tracking-[0.16em] uppercase">Why Synergy 3D</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#07101f] leading-tight mb-4 border-l-4 border-blue-600 pl-4">
              <span className="inline-block whitespace-nowrap">Better Outcomes.</span>
              <em className="italic text-blue-600 font-extrabold block">Less chair time.</em>
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-8 pl-5.5">
              Precision lab science meets seamless digital workflows <br/> — so every restoration fits right, first time.
            </p>
            <div className="flex overflow-x-auto snap-x snap-mandatory pt-4 -mx-8 px-8 sm:mx-0 sm:px-0 sm:pt-0 sm:pb-0 sm:grid sm:grid-cols-2 gap-4">
              {/* Start spacer for scroll spacing on mobile */}
              <div className="w-1 shrink-0 sm:hidden" />
              {[
                {
                  title: 'Sub-30µm precision',
                  desc: 'Premium zirconia, e.max & hybrid materials milled to industry-leading accuracy.',
                  iconType: 'target',
                  linkText: 'Explore products →',
                  linkUrl: '/products'
                },
                {
                  title: 'Seamless digital workflow',
                  desc: 'From scan upload to delivery — no impressions, no delays, no friction.',
                  iconType: 'pulse',
                  linkText: 'See integrations →',
                  linkUrl: '/integrations'
                },
                {
                  title: 'FDA-cleared materials',
                  desc: 'Biocompatible, FDA-cleared restorations. Made in the USA, guaranteed.',
                  iconType: 'shield',
                  linkText: 'Learn more →',
                  linkUrl: '/about'
                },
                {
                  title: '7-day clinical support',
                  desc: 'Real dental technicians available every day of the week for complex cases.',
                  iconType: 'users',
                  linkText: 'Talk to a tech →',
                  linkUrl: '/callback'
                }
              ].map((ft, i) => (
                <div key={i} className="bg-white border border-[#dde6f5] rounded-xl p-4 hover:shadow-premium hover:-translate-y-1 transition-all flex flex-col items-start text-left w-[260px] sm:w-auto shrink-0 snap-start scroll-mx-8">
                  <div className="w-10 h-10 rounded-xl bg-[#eef4ff] flex items-center justify-center text-blue-default mb-4.5">
                    {renderIcon(ft.iconType, "w-4 h-4")}
                  </div>
                  <h4 className="text-sm font-bold text-[#07101f] mb-2 leading-snug">{ft.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4">{ft.desc}</p>
                  <Link href={ft.linkUrl} className="text-xs font-semibold text-blue-default hover:text-blue-bright transition-colors mt-auto">
                    {ft.linkText}
                  </Link>
                </div>
              ))}
              {/* End spacer for scroll spacing on mobile */}
              <div className="w-1 shrink-0 sm:hidden" />
            </div>
          </div>

          <div className="lg:col-span-6 aspect-[9/12.5] rounded-2xl overflow-hidden relative shadow-xs bg-white flex flex-col border border-[#dde6f5] ">
            {/* Image Container */}
            <div className="relative flex-grow w-full">
              <Image 
                src={whySynergyImg} 
                alt="Why Synergy Restorations" 
                fill 
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section className="bg-white md:py-24 py-12 text-navy-text border-t border-gray-200">
        <div className="max-w-[1140px] mx-auto px-8 md:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-[560px]">
              <div className="inline-block text-[11px] font-bold tracking-[0.14em] uppercase text-blue-600 mb-4">Our Products</div>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight mb-4">Restorative solutions <br/>to fit  <em className='text-blue-600 font-bold italic'>every need.</em></h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                A full restoration menu — milled in-house in our New York lab, delivered in 5 days.
              </p>
            </div>
            <Link href="/products" className="bg-white border border-blue-default/30 hover:bg-blue-pale/25 text-blue-default font-semibold py-2.5 px-6 rounded-lg text-sm transition-all hover:border-blue-default/60 whitespace-nowrap cursor-pointer flex items-center justify-center gap-1">
              View all products →
            </Link>
          </div>

          <div className="hidden md:flex flex-col gap-6">
            {/* Row 1 & 2: 2 Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allProducts.slice(0, 4).map((p) => renderProductCard(p))}
            </div>

            {/* Row 3: 3 Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {allProducts.slice(4).map((p) => renderProductCard(p))}
            </div>
          </div>

          {/* Mobile Carousel View */}
          <div className="flex md:hidden overflow-x-auto snap-x snap-mandatory pt-4 pb-8 -mx-8 px-8 gap-6">
            <div className="w-1 shrink-0" />
            {allProducts.map((p) => renderProductCard(p, true))}
            <div className="w-1 shrink-0" />
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-navy py-12 md:py-24 text-white overflow-hidden">
        <div className="max-w-[1140px] mx-auto px-8 md:px-16">
          <div className="text-center max-w-[700px] mx-auto mb-4 md:mb-16">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-blue-glow mb-4 block">How it works</span>
            <h2 className="font-serif text-3xl sm:text-7xl font-extrabold leading-tight mb-4">
              Three steps.<em className="italic text-blue-glow block">Zero friction.</em>
            </h2>
            <p className="text-md text-muted-dark leading-relaxed">
              From scan to seat, we’ve removed every point of friction between your chair and your lab.
            </p>
          </div>

          <div className="relative flex overflow-x-auto snap-x snap-mandatory pt-4 pb-2 md:pb-12 -mx-8 px-8 gap-8 mb-0 md:mb-14 md:mx-0 md:px-0 md:pt-0 md:pb-0 md:grid md:grid-cols-3 before:absolute before:top-[110px] before:left-[10%] before:right-[10%] before:h-px before:bg-blue-default/20 before:hidden before:md:block before:z-0">
            {/* Start spacer for scroll spacing on mobile */}
            <div className="w-1 shrink-0 md:hidden" />
            {[
              {
                step: '01',
                title: 'Scan & Upload',
                desc: 'Use any major intraoral scanner. Upload to our portal in under 2 minutes — no shipping impressions ever.',
                drawing: (
                  <svg className="w-20 h-20 text-blue-default/60" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 100 100">
                    <rect x="25" y="25" width="50" height="50" rx="6" />
                    <rect x="32" y="32" width="36" height="30" rx="3" />
                    <path d="M40 54 C40 50, 43 48, 45 52 C47 48, 50 48, 52 52 C54 48, 57 50, 57 54 L57 57 L40 57 Z" />
                    <path d="M35 32 L45 48 M65 32 L52 48" strokeDasharray="2 2" />
                    <path d="M50 32 L49 48" strokeDasharray="2 2" />
                  </svg>
                )
              },
              {
                step: '02',
                title: 'Design & Mill',
                desc: 'Our certified technicians design your case in leading CAD software, then mill it in-house with exact precision.',
                drawing: (
                  <svg className="w-20 h-20 text-blue-default/60" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 100 100">
                    <rect x="20" y="25" width="60" height="42" rx="4" />
                    <path d="M42 67 L35 80 L65 80 L58 67 Z" />
                    <path d="M30 48 C30 42, 35 40, 40 45 C45 40, 50 40, 55 45 C60 40, 65 42, 65 48" />
                    <circle cx="40" cy="45" r="2" fill="currentColor" />
                    <circle cx="55" cy="45" r="2" fill="currentColor" />
                    <path d="M30 48 L70 48" strokeDasharray="1 1" />
                    <path d="M25 30 H75 M25 35 H75" />
                  </svg>
                )
              },
              {
                step: '03',
                title: 'Ship in 5 Days',
                desc: 'Your restoration ships directly to your practice within 5 business days — guaranteed, all 50 states.',
                drawing: (
                  <svg className="w-20 h-20 text-blue-default/60" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 100 100">
                    <path d="M50 25 L80 35 L80 65 L50 78 L20 65 L20 35 Z" />
                    <path d="M50 25 L50 78" />
                    <path d="M20 35 L50 48 L80 35" />
                    <path d="M30 50 C30 45, 40 43, 40 48 C40 55, 30 58, 30 50 Z" />
                    <path d="M10 40 H18 M5 48 H15 M8 56 H17" strokeWidth="1.5" />
                  </svg>
                )
              }
            ].map((st, i) => (
              <div key={i} className="relative z-10 bg-[#071125]/40 border border-white/5 hover:border-blue-glow/20 rounded-xl p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col items-center w-[280px] md:w-auto shrink-0 snap-start scroll-mx-8">
                {/* Image Box */}
                <div className="w-full aspect-[1.5/1] bg-gradient-to-b from-[#091535] to-[#040b21] rounded-xl border border-white/5 relative flex items-center justify-center mb-8">
                  {/* Step oval badge */}
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-default px-3.5 py-0.5 rounded-full text-[10px] font-bold text-white tracking-widest leading-none shadow-md">
                    {st.step}
                  </div>
                  {/* Vector Drawing */}
                  {st.drawing}
                </div>

                {/* Short blue horizontal line */}
                <div className="w-7 h-[2px] bg-gradient-to-r from-blue to-blue-glow rounded-full mb-3.5" />

                {/* Title */}
                <h3 className="text-lg font-semibold text-white mb-2 leading-snug">{st.title}</h3>

                {/* Description */}
                <p className="text-xs text-muted-dark leading-relaxed max-w-[220px] md:max-w-[150px]">{st.desc}</p>
              </div>
            ))}
            {/* End spacer for scroll spacing on mobile */}
            <div className="w-1 shrink-0 md:hidden" />
          </div>

          {/* Bottom Bar: 4 highlight items */}
          <div className="border-t border-white/5 pt-4 mt-16 flex overflow-x-auto snap-x snap-mandatory md:-mx-8 px-8 gap-6 w-full md:mx-0 md:px-0 md:flex-row md:items-center md:justify-between">
            {/* Start spacer for scroll spacing on mobile */}
            <div className="w-1 shrink-0 md:hidden" />
            
            {/* Item 1 */}
            <div className="flex items-center gap-3.5 md:flex-1 justify-center md:justify-start shrink-0 snap-start scroll-mx-8 w-[160px] md:w-auto">
              <Clock className="w-5 h-5 text-blue-default shrink-0" strokeWidth={2} />
              <div className="text-left text-xs font-semibold text-white/90 leading-tight">
                No shipping <span className="block text-white/50 font-normal mt-0.5">impressions</span>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-12 bg-white/10 shrink-0" />

            {/* Item 2 */}
            <div className="flex items-center gap-3.5 md:flex-1 justify-center md:justify-start shrink-0 snap-start scroll-mx-8 w-[160px] md:w-auto">
              <ShieldCheck className="w-5 h-5 text-blue-default shrink-0" strokeWidth={2} />
              <div className="text-left text-xs font-semibold text-white/90 leading-tight">
                Certified <span className="block text-white/50 font-normal mt-0.5">technicians</span>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-12 bg-white/10 shrink-0" />

            {/* Item 3 */}
            <div className="flex items-center gap-3.5 md:flex-1 justify-center md:justify-start shrink-0 snap-start scroll-mx-8 w-[160px] md:w-auto">
              <Clock className="w-5 h-5 text-blue-default shrink-0" strokeWidth={2} />
              <div className="text-left text-xs font-semibold text-white/90 leading-tight">
                Consistent <span className="block text-white/50 font-normal mt-0.5">turnarounds</span>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-12 bg-white/10 shrink-0" />

            {/* Item 4 */}
            <div className="flex items-center gap-3.5 md:flex-1 justify-center md:justify-start shrink-0 snap-start scroll-mx-8 w-[160px] md:w-auto">
              <MapPin className="w-5 h-5 text-blue-default shrink-0" strokeWidth={2} />
              <div className="text-left text-xs font-semibold text-white/90 leading-tight">
                Nationwide <span className="block text-white/50 font-normal mt-0.5">shipping</span>
              </div>
            </div>

            {/* End spacer for scroll spacing on mobile */}
            <div className="w-1 shrink-0 md:hidden" />
          </div>
        </div>
      </section>

      {/* ── FEEDBACKS FROM DOCTORS ── */}
      <section className="bg-navy pb-12 md:pb-24 text-white border-t border-white/6">
        <div className="max-w-[1140px] mx-auto px-8 md:px-16">
          <div className="flex flex-col mb-16 items-start text-left pt-16">
            <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-blue-glow mb-4 block">Trusted by 1000+</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold leading-tight text-white mb-4">
              Dentists <em className="italic text-blue-glow font-normal">love</em> Synergy 3D.
            </h2>
            <p className="text-md text-muted-dark leading-relaxed max-w-[650px]">
              Leading practices and DSO groups across the country rely on us for precision restorations, every day.
            </p>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory pt-4 pb-12 -mx-8 px-8 gap-6 md:mx-0 md:px-0 md:pt-0 md:pb-0 md:grid md:grid-cols-3">
            {/* Start spacer for scroll spacing on mobile */}
            <div className="w-1 shrink-0 md:hidden" />
            {featuredTestimonials.map((ts, i) => (
              <div
                key={i}
                className="bg-navy-card border border-border-dark hover:border-blue-glow/20 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col w-[280px] md:w-auto shrink-0 snap-start scroll-mx-8"
                onClick={() => playVideo(ts.videoId, `Review 0${i + 1}`, `${ts.name} Testimonial`, `${ts.role1} ${ts.role2}`)}
              >
                {/* Video Preview Box */}
                <div className="aspect-video relative overflow-hidden bg-navy-mid flex items-center justify-center shrink-0">
                  <Image 
                    src={ts.imgPath} 
                    alt={ts.name} 
                    fill 
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover opacity-35" 
                  />
                  <div className="absolute inset-0 bg-[#071125]/75 hover:bg-[#071125]/50 transition-colors z-[1]" />
                  
                  {/* Rating Stars top-left */}
                  <div className="absolute top-4 left-4 z-[2] flex gap-0.5">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="w-3 h-3 fill-amber-500 text-amber-500" />
                    ))}
                  </div>

                  {/* Play Button center */}
                  <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center hover:bg-blue-default hover:border-blue-default hover:scale-110 transition-all duration-300 z-[2]">
                    <Play className="w-4 h-4 fill-white text-white ml-0.5" />
                  </div>

                  {/* Video Duration bottom-right */}
                  <div className="absolute bottom-3 right-3 z-[2] bg-black/75 px-1.5 py-0.5 rounded text-[9px] font-bold text-white tracking-wider">
                    {ts.duration}
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6 flex flex-col flex-grow items-start text-left justify-between">
                  <blockquote className="font-serif text-[0.98rem] italic text-white/85 leading-relaxed mb-6">
                    {ts.quote}
                  </blockquote>

                  {/* Profile info footer */}
                  <div className="flex items-center gap-3.5 mt-auto pt-6 border-t border-white/5 w-full">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-blue-default/20 border border-blue-default/30 flex items-center justify-center text-blue-glow shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                    
                    {/* Name and Clinic */}
                    <div className="flex-grow min-w-0 text-left">
                      <strong className="text-sm font-semibold text-white block leading-tight truncate">{ts.name}</strong>
                      <span className="text-[11px] text-muted-dark leading-normal block mt-1">
                        {ts.role1} <span className="block truncate">{ts.role2}</span>
                      </span>
                    </div>

                    {/* Outcome Badge */}
                    <span className="inline-flex items-center gap-1 bg-green-500/12 text-green-500 text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0">
                      {ts.resultType === 'down' && <ArrowDown className="w-3 h-3 shrink-0" />}
                      {ts.result}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {/* End spacer for scroll spacing on mobile */}
            <div className="w-1 shrink-0 md:hidden" />
          </div>
        </div>
      </section>

      {/* ── GETTING STARTED ── */}
      <section className="bg-[#0C1829] py-8 md:py-24 text-white border-t border-white/5">
        <div className="max-w-[1140px] mx-auto px-8 md:px-16">
          <div className="text-center max-w-[600px] mx-auto mb-8 md:mb-16">
            <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-blue-glow mb-4 block">Get Started</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold leading-tight text-white mb-4">
              3 ways to get started.
            </h2>
            <p className="text-md text-muted-dark leading-relaxed">
              Whether you're a solo practitioner or a national DSO, we have a<br/>model built for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                label: 'Private Practice',
                title: 'For Solo & Small Practices',
                desc: 'Streamline your lab workflow, grow case output, and deliver more precise restorations without the overhead.',
                linkText: 'Get started →',
                linkUrl: '/callback',
                icon: <HomeIcon className="w-5 h-5" />
              },
              {
                label: 'Group Practice',
                title: 'For Multi-Location Groups',
                desc: 'Standardize workflows across locations, consolidate lab spend, and unlock volume pricing across your network.',
                linkText: 'Learn more →',
                linkUrl: '/about',
                icon: <Building2 className="w-5 h-5" />
              },
              {
                label: 'DSO / Enterprise',
                title: 'For DSOs & Enterprise',
                desc: 'Dedicated account management, consolidated invoicing, custom integrations, and scalable solutions at any size.',
                linkText: 'Contact sales →',
                linkUrl: '/callback',
                icon: <Globe className="w-5 h-5" />
              }
            ].map((card, i) => (
              <div key={i} className="bg-navy-card border border-white/5 hover:border-blue-glow/20 rounded-2xl p-8 flex flex-col items-start text-left transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl">
                {/* Header */}
                <div className="flex items-center gap-3.5 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#0d2149]/40 border border-blue-default/20 flex items-center justify-center text-blue-glow shrink-0">
                    {card.icon}
                  </div>
                  <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-blue-glow">{card.label}</span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white mb-3 leading-snug">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-[0.88rem] text-muted-dark leading-relaxed mb-6">
                  {card.desc}
                </p>

                {/* Action Link */}
                <Link href={card.linkUrl} className="text-xs sm:text-sm font-semibold text-blue-default hover:text-blue-bright transition-colors mt-auto flex items-center gap-1">
                  {card.linkText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section className="bg-white py-12 md:py-24 text-navy-text">
        <div className="max-w-[1140px] mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-blue-600 mb-4 block">FAQ</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold mb-4">Frequently asked <em className="text-blue-600 italic">questions.</em></h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-8">
              Have more questions? Our team is available 7 days a week — call, email, or chat anytime.
            </p>
            <Link href="/callback" className="inline-block bg-blue-default hover:bg-blue-bright text-white font-semibold py-3 px-6 rounded-lg text-[0.92rem] transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
              Contact Support
            </Link>
          </div>

          <div className="lg:col-span-8 flex flex-col divide-y divide-gray-200">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="py-5 first:pt-0">
                  <button
                    onClick={() => toggleFaq(i)}
                    className="w-full bg-transparent border-none text-left py-3 flex justify-between items-center gap-5 cursor-pointer group"
                  >
                    <span className={`text-[15px] font-semibold ${isOpen ? 'text-blue' : 'text-navy-text'} group-hover:text-blue transition-colors`}>
                      {faq.q}
                    </span>
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center border font-semibold text-lg text-blue-600 shrink-0 transition-all ${isOpen ? 'rotate-45 bg-blue-600 text-white border-blue' : 'bg-gray-100 border-border-light'
                      }`}>
                      +
                    </span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 text-[0.9rem] text-gray-500 leading-relaxed ${isOpen ? 'max-h-[220px] pt-2 pb-4' : 'max-h-0'
                    }`}>
                    {faq.a}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA BOX ── */}
      <section className="bg-navy py-24 px-8 md:px-8 text-white">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#1344c4] to-[#0d2e9e] rounded-3xl p-5 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_0%,rgba(255,255,255,0.1)_0%,transparent_65%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)] bg-[size:44px_44px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            <h2 className="font-serif text-3xl sm:text-6xl font-extrabold leading-tight mb-5">
              Start your first case <em className="italic">today.</em>
            </h2>
            <p className="text-white/70 text-md max-w-[440px] leading-relaxed mb-10">
              Send a digital scan in under 60 seconds. We handle design, milling, and shipping — backed by our full guarantee.
            </p>
            <div className="flex flex-wrap gap-3.5 justify-center mb-12">
              <a href="https://synergy.greatlab.io/login" target="_blank" rel="noopener noreferrer" className="inline-block bg-white hover:bg-gray-50 text-blue-600 font-semibold py-3.5 px-8 rounded-lg text-[0.95rem] shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center">
                Send Digital Scan →
              </a>
              <button
                onClick={triggerShipping}
                className="inline-block bg-transparent hover:bg-white/6 text-white font-semibold py-3.5 px-6 rounded-lg text-[0.92rem] border border-white/20 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                Open The Portal
              </button>
            </div>

            <div className="w-full h-px bg-white/12 mb-10" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-[800px]">
              {[
                { n: '5-Days', l: 'Guaranteed delivery' },
                { n: 'USA', l: 'Made in America' },
                { n: '<1%', l: 'Remake Rate' },
                { n: 'All 50', l: 'States Served' }
              ].map((cs, i) => (
                <div key={i} className="text-center">
                  <span className="font-serif text-2xl sm:text-3xl font-extrabold text-white block leading-none">{cs.n}</span>
                  <span className="text-xs text-white/55 tracking-wider uppercase mt-2.5 block">{cs.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
