'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import synergyLogo from '../../../public/synergy3d_logo-new.png'

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileLabExpanded, setMobileLabExpanded] = useState(false);
  const [mobileLearningsExpanded, setMobileLearningsExpanded] = useState(false);
  const [mobileQuickExpanded, setMobileQuickExpanded] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const triggerShipping = () => {
    window.dispatchEvent(new Event('open-shipping-modal'));
  };

  return (
    <>
      <nav
        className={`fixed left-0 right-0 z-[300] px-6 lg:px-16 h-[60px] flex items-center justify-between border-b border-white/6 transition-all duration-400 backdrop-blur-[28px] saturate-[1.5] ${isScrolled
          ? 'top-0 bg-navy/98 shadow-lg'
          : 'top-0 lg:top-9 bg-navy/85'
          }`}
        id="nav"
      >
      <Link href="/" className="flex items-center shrink-0 cursor-pointer">
        <Image
          src={synergyLogo}
          alt="SYNERGY 3D"
          width={120}
          height={60}
          className="w-auto h-5 md:h-6 object-contain"
        />
      </Link>

      <ul className="hidden lg:flex items-center gap-1 list-none">
        <li className="relative group/nav">
          <Link
            href="/products"
            className={`text-white/75 hover:text-white text-[13px] font-medium px-3 py-2 rounded-md flex items-center gap-1 transition-all group-hover/nav:bg-white/6 ${pathname.startsWith('/products') ? 'text-white bg-white/6' : ''
              }`}
          >
            Lab Services <span className="text-[0.6rem] opacity-60">▾</span>
          </Link>
          <div className="absolute top-[calc(100%+10px)] left-0 bg-white rounded-sm shadow-premium border border-black/6 w-[220px] py-2 opacity-0 invisible translate-y-2 group-hover/nav:opacity-100 group-hover/nav:visible group-hover/nav:translate-y-0 transition-all duration-220 z-[400]">
            <Link
            href='/products'
            className="block text-[11px] font-bold text-blue-500 tracking-wider uppercase bg-[#eef3ff] px-5 py-2.5 border-b border-[#e2eaf8] mb-1 cursor-pointer">
              Explore all products
            </Link>
            {/* <Link href="/products" className="block px-5 py-2.5 text-[11px] text-[#374263] font-medium hover:bg-[#f0f5ff] hover:text-blue transition-colors">
              All Products
            </Link> */}
            <Link href="/products/zirconia-crowns" className="block px-5 py-2.5 text-[11px] text-[#374263] font-medium hover:bg-[#f0f5ff] hover:text-blue transition-colors">
              Zirconia Crowns
            </Link>
            <Link href="/products/all-on-x-hybrids" className="block px-5 py-2.5 text-[11px] text-[#374263] font-medium hover:bg-[#f0f5ff] hover:text-blue transition-colors">
              All-on-X Hybrids
            </Link>
            <Link href="/products/e-max-restorations" className="block px-5 py-2.5 text-[11px] text-[#374263] font-medium hover:bg-[#f0f5ff] hover:text-blue transition-colors">
              e.max Restorations
            </Link>
            <Link href="/products/pfm-crowns" className="block px-5 py-2.5 text-[11px] text-[#374263] font-medium hover:bg-[#f0f5ff] hover:text-blue transition-colors">
              PFM Crowns
            </Link>
            <Link href="/products/surgical-guides" className="block px-5 py-2.5 text-[11px] text-[#374263] font-medium hover:bg-[#f0f5ff] hover:text-blue transition-colors">
              Surgical Guides
            </Link>
            <Link href="/products/night-guards" className="block px-5 py-2.5 text-[11px] text-[#374263] font-medium hover:bg-[#f0f5ff] hover:text-blue transition-colors">
              Night Guards
            </Link>
            <Link href="/products/printed-models-dies" className="block px-5 py-2.5 text-[11px] text-[#374263] font-medium hover:bg-[#f0f5ff] hover:text-blue transition-colors">
              Printed Models & Dies
            </Link>
          </div>
        </li>

        <li className="relative group/nav">
          <a
            className={`text-white/75 hover:text-white text-[13px] font-medium px-3 py-2 rounded-md flex items-center gap-1 cursor-pointer transition-all group-hover/nav:bg-white/6`}
          >
            Learnings <span className="text-[11px] opacity-60">▾</span>
          </a>
          <div className="absolute top-[calc(100%+10px)] left-0 bg-white rounded-sm shadow-premium border border-black/6 w-[220px] py-1.5 opacity-0 invisible translate-y-2 group-hover/nav:opacity-100 group-hover/nav:visible group-hover/nav:translate-y-0 transition-all duration-220 z-[400]">
            <Link href="/talks" className="flex flex-col items-start gap-0.5 px-5 py-3 border-b border-[#f0f4fb] hover:bg-[#f0f5ff] group/item transition-colors">
              <span className="text-[11px] font-semibold text-[#0a1530] group-hover/item:text-blue">SynergyTalks</span>
              <span className="text-[11px] text-[#8a9abf] font-normal">Short & long-form videos</span>
            </Link>
            <Link href="/education" className="flex flex-col items-start gap-0.5 px-5 py-3 border-b border-[#f0f4fb] hover:bg-[#f0f5ff] group/item transition-colors">
              <span className="text-[11px] font-semibold text-[#0a1530] group-hover/item:text-blue">Education</span>
              <span className="text-[11px] text-[#8a9abf] font-normal">Hands-on learning resources</span>
            </Link>
            <Link href="/articles" className="flex flex-col items-start gap-0.5 px-5 py-3 border-b border-[#f0f4fb] hover:bg-[#f0f5ff] group/item transition-colors">
              <span className="text-[11px] font-semibold text-[#0a1530] group-hover/item:text-blue">Articles</span>
              <span className="text-[11px] text-[#8a9abf] font-normal">Insights from the bench</span>
            </Link>
            <Link href="/webinars" className="flex flex-col items-start gap-0.5 px-5 py-3 border-b border-transparent hover:bg-[#f0f5ff] group/item transition-colors">
              <span className="text-[11px] font-semibold text-[#0a1530] group-hover/item:text-blue">Webinars</span>
              <span className="text-[11px] text-[#8a9abf] font-normal">Live & on-demand sessions</span>
            </Link>
            <Link href="/customer-stories" className="flex flex-col items-start gap-0.5 px-5 py-3 border-b border-transparent hover:bg-[#f0f5ff] group/item transition-colors">
              <span className="text-[11px] font-semibold text-[#0a1530] group-hover/item:text-blue">Customer Stories</span>
              <span className="text-[11px] text-[#8a9abf] font-normal">How clinicians use Synergy3D</span>
            </Link>
          </div>
        </li>

        <li>
          <Link
            href="/about"
            className={`text-white/75 hover:text-white text-[13px] font-medium px-3 py-2 rounded-md transition-all ${pathname === '/about' ? 'text-white bg-white/6' : ''
              }`}
          >
            About Us
          </Link>
        </li>

        <li>
          <a
            href="https://synergy.greatlab.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/75 hover:text-white text-[13px] font-medium px-3 py-2 rounded-md transition-all"
          >
            Customer Portal
          </a>
        </li>

        <li className="relative group/nav">
          <a className="text-white/75 hover:text-white text-[13px] font-medium px-3 py-2 rounded-md flex items-center gap-1 cursor-pointer transition-all group-hover/nav:bg-white/6">
            Quick Links <span className="text-[11px] opacity-60">▾</span>
          </a>
          <div className="absolute top-[calc(100%+10px)] left-0 bg-white rounded-sm shadow-premium border border-black/6 w-[200px] py-2.5 opacity-0 invisible translate-y-2 group-hover/nav:opacity-100 group-hover/nav:visible group-hover/nav:translate-y-0 transition-all duration-220 z-[400]">
            <div className="text-[0.68rem] font-bold tracking-widest text-[#aab4ce] px-5 py-1 uppercase">
              Tools
            </div>
            <a href='https://synergy3d.net/wp-content/uploads/2025/03/synegy-script.pdf' target='_blank' rel='noopener noreferrer' className="flex items-center gap-2.5 px-5 py-2.5 text-[11px] font-medium text-[#374263] hover:bg-[#f0f5ff] hover:text-blue transition-colors cursor-pointer group/item">
              <span className="flex items-center justify-center w-7.5 h-7.5 bg-[#f0f4fb] rounded-[7px] text-[#6b7a99] shrink-0 group-hover/item:bg-[#dbeafe] group-hover/item:text-blue transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </span>
              Download Rx Form
            </a>
            <a
              onClick={triggerShipping}
              className="flex items-center gap-2.5 px-5 py-2.5 text-[11px] font-medium text-[#374263] hover:bg-[#f0f5ff] hover:text-blue transition-colors cursor-pointer group/item"
            >
              <span className="flex items-center justify-center w-7.5 h-7.5 bg-[#f0f4fb] rounded-[7px] text-[#6b7a99] shrink-0 group-hover/item:bg-[#dbeafe] group-hover/item:text-blue transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13" rx="1" />
                  <path d="M16 8h4l3 5v3h-7V8z" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </span>
              Shipping Label
            </a>
            {/* <div className="h-px bg-[#eef1f8] my-2" />
            <Link
              href="/integrations"
              className="flex items-center gap-2.5 px-5 py-2.5 text-[11px] font-semibold text-[#0a1530] hover:bg-[#f0f5ff] hover:text-blue transition-colors cursor-pointer"
            >
              Track Case
            </Link> */}
          </div>
        </li>
      </ul>

      <div className="hidden lg:flex items-center gap-1.5 shrink-0">
        <Link
          href="/contact-details"
          className={`text-white/75 hover:text-white text-[13px] font-medium px-3.5 py-2 rounded-md transition-all ${pathname === '/callback' ? 'text-white bg-white/6' : ''
            }`}
        >
          Request a Call Back
        </Link>
        <a
          href="https://synergy.greatlab.io/login"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 bg-blue-default hover:bg-blue-bright text-white px-4.5 py-2.25 rounded-[7px] text-[13px] font-semibold transition-all hover:-translate-y-[1px]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '15px', height: '15px' }}>
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
          Login / Sign Up
        </a>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="flex lg:hidden items-center justify-center w-9 h-9 rounded-lg hover:bg-white/6 transition-colors border-none bg-transparent cursor-pointer text-white"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

    </nav>

    {/* Mobile Menu Overlay */}
    {isMobileMenuOpen && (
      <div className="fixed inset-x-0 bottom-0 top-[60px] z-[299] bg-navy/98 backdrop-blur-[20px] border-t border-white/5 flex flex-col overflow-y-auto px-6 py-4 lg:hidden">
        <div className="flex flex-col gap-1 w-full">
          {/* Lab Services Accordion */}
          <div className="border-b border-white/5">
            <button
              onClick={() => setMobileLabExpanded(!mobileLabExpanded)}
              className="w-full flex items-center justify-between text-white/85 text-[14px] font-semibold py-4 bg-transparent border-none text-left cursor-pointer"
            >
              <span>Lab Services</span>
              {mobileLabExpanded ? <ChevronUp size={16} className="text-white/40" /> : <ChevronDown size={16} className="text-white/40" />}
            </button>
            {mobileLabExpanded && (
              <div className="pl-4 pb-3 flex flex-col gap-2.5">
                {/* <Link href="/products" className="block text-white/70 text-[13px] font-medium py-1 hover:text-white transition-colors">
                  All Products
                </Link> */}
                <Link href="/products/zirconia-crowns" className="block text-white/70 text-[13px] font-medium py-1 hover:text-white transition-colors">
                  Zirconia Crowns
                </Link>
                <Link href="/products/all-on-x-hybrids" className="block text-white/70 text-[13px] font-medium py-1 hover:text-white transition-colors">
                  All-on-X Hybrids
                </Link>
                <Link href="/products/e-max-restorations" className="block text-white/70 text-[13px] font-medium py-1 hover:text-white transition-colors">
                  e.max Restorations
                </Link>
                <Link href="/products/pfm-crowns" className="block text-white/70 text-[13px] font-medium py-1 hover:text-white transition-colors">
                  PFM Crowns
                </Link>
                <Link href="/products/surgical-guides" className="block text-white/70 text-[13px] font-medium py-1 hover:text-white transition-colors">
                  Surgical Guides
                </Link>
                <Link href="/products/night-guards" className="block text-white/70 text-[13px] font-medium py-1 hover:text-white transition-colors">
                  Night Guards
                </Link>
                <Link href="/products/printed-models-dies" className="block text-white/70 text-[13px] font-medium py-1 hover:text-white transition-colors">
                  Printed Models & Dies
                </Link>
              </div>
            )}
          </div>

          {/* Learnings Accordion */}
          <div className="border-b border-white/5">
            <button
              onClick={() => setMobileLearningsExpanded(!mobileLearningsExpanded)}
              className="w-full flex items-center justify-between text-white/85 text-[14px] font-semibold py-4 bg-transparent border-none text-left cursor-pointer"
            >
              <span>Learnings</span>
              {mobileLearningsExpanded ? <ChevronUp size={16} className="text-white/40" /> : <ChevronDown size={16} className="text-white/40" />}
            </button>
            {mobileLearningsExpanded && (
              <div className="pl-4 pb-3 flex flex-col gap-2.5">
                <Link href="/talks" className="block text-white/70 text-[13px] font-medium py-1 hover:text-white transition-colors">
                  SynergyTalks (Videos)
                </Link>
                <Link href="/education" className="block text-white/70 text-[13px] font-medium py-1 hover:text-white transition-colors">
                  Education
                </Link>
                <Link href="/articles" className="block text-white/70 text-[13px] font-medium py-1 hover:text-white transition-colors">
                  Articles
                </Link>
                <Link href="/webinars" className="block text-white/70 text-[13px] font-medium py-1 hover:text-white transition-colors">
                  Webinars
                </Link>
              </div>
            )}
          </div>

          {/* About Us Link */}
          <div className="border-b border-white/5">
            <Link
              href="/about"
              className="block text-white/85 text-[14px] font-semibold py-4 hover:text-white transition-colors"
            >
              About Us
            </Link>
          </div>

          {/* Customer Portal Link */}
          <div className="border-b border-white/5">
            <a
              href="https://synergy.greatlab.io"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-white/85 text-[14px] font-semibold py-4 hover:text-white transition-colors"
            >
              Customer Portal
            </a>
          </div>

          {/* Quick Links Accordion */}
          <div className="border-b border-white/5">
            <button
              onClick={() => setMobileQuickExpanded(!mobileQuickExpanded)}
              className="w-full flex items-center justify-between text-white/85 text-[14px] font-semibold py-4 bg-transparent border-none text-left cursor-pointer"
            >
              <span>Quick Links</span>
              {mobileQuickExpanded ? <ChevronUp size={16} className="text-white/40" /> : <ChevronDown size={16} className="text-white/40" />}
            </button>
            {mobileQuickExpanded && (
              <div className="pl-4 pb-3 flex flex-col gap-2.5">
                <a href="https://synergy3d.net/wp-content/uploads/2025/03/synegy-script.pdf" target="_blank" rel="noopener noreferrer" className="block text-white/70 text-[13px] font-medium py-1 hover:text-white transition-colors cursor-pointer">
                  Download Rx Form
                </a>
                <a
                  onClick={triggerShipping}
                  className="block text-white/70 text-[13px] font-medium py-1 hover:text-white transition-colors cursor-pointer"
                >
                  Shipping Label
                </a>
                {/* <Link href="/integrations" className="block text-white/70 text-[13px] font-medium py-1 hover:text-white transition-colors">
                  Track Case
                </Link> */}
              </div>
            )}
          </div>
        </div>

        {/* Call Back & Login CTAs */}
        <div className="flex flex-col gap-4.5 mt-8 mb-6">
          <Link
            href="/callback"
            className="text-white/75 hover:text-white text-[13px] font-semibold py-2.5 text-center rounded-lg border border-white/10 bg-white/5 transition-colors"
          >
            Request a Call Back
          </Link>
          <a
            href="https://synergy.greatlab.io/login"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 bg-blue-default hover:bg-blue-bright text-white py-3 rounded-[7px] text-[13px] font-semibold transition-all hover:brightness-110"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '15px', height: '15px' }}>
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
            Login / Sign Up
          </a>
        </div>
      </div>
    )}
  </>
  );
};
export default Navbar;
