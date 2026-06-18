import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../public/synergy3d_logo-new.png';
import { MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-mid border-t border-border-dark py-20">
      <div className="max-w-6xl mx-auto px-8 md:px-16 grid grid-cols-2 md:grid-cols-4 gap-16">
        <div className="flex flex-col">
          <Link href="/" className="logo block mb-3.5 shrink-0">
            <Image src={logo} alt="SYNERGY 3D" width={200} height={60} />
          </Link>
          <p className="text-[0.85rem] text-muted-dark leading-relaxed max-w-[280px] mt-0.5">
            New York's leading digital dental laboratory. Precision restorations in five days.
          </p>
        </div>
        <div className="flex flex-col">
          <h4 className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-white mb-5">Products</h4>
          <ul className="list-none flex flex-col gap-3">
            <li><Link href="/products/zirconia" className="text-muted-dark hover:text-white text-[0.85rem] transition-colors cursor-pointer">Zirconia Crowns</Link></li>
            <li><Link href="/products/allonx" className="text-muted-dark hover:text-white text-[0.85rem] transition-colors cursor-pointer">All-on-X Hybrids</Link></li>
            <li><Link href="/products/emax" className="text-muted-dark hover:text-white text-[0.85rem] transition-colors cursor-pointer">e.max Restorations</Link></li>
            <li><Link href="/products/pfm" className="text-muted-dark hover:text-white text-[0.85rem] transition-colors cursor-pointer">PFM Crowns</Link></li>
            <li><Link href="/products/surgical" className="text-muted-dark hover:text-white text-[0.85rem] transition-colors cursor-pointer">Surgical Guides</Link></li>
            <li><Link href="/products/nightguard" className="text-muted-dark hover:text-white text-[0.85rem] transition-colors cursor-pointer">Night Gaurds</Link></li>
            <li><Link href="/products/models" className="text-muted-dark hover:text-white text-[0.85rem] transition-colors cursor-pointer">Printed Models & Dies</Link></li>
          </ul>
        </div>
        <div className="flex flex-col">
          <h4 className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-white mb-5">Company</h4>
          <ul className="list-none flex flex-col gap-3">
            <li><Link href="/about" className="text-muted-dark hover:text-white text-[0.85rem] transition-colors cursor-pointer">About Us</Link></li>
            <li><Link href="/talks" className="text-muted-dark hover:text-white text-[0.85rem] transition-colors cursor-pointer">SynergyTalks</Link></li>
            <li><Link href="/articles" className="text-muted-dark hover:text-white text-[0.85rem] transition-colors cursor-pointer">Articles</Link></li>
            <li><Link href="/webinars" className="text-muted-dark hover:text-white text-[0.85rem] transition-colors cursor-pointer">Webinars</Link></li>
            <li><Link href="/education" className="text-muted-dark hover:text-white text-[0.85rem] transition-colors cursor-pointer">Education</Link></li>
            <li><Link href="/customer-stories" className="text-muted-dark hover:text-white text-[0.85rem] transition-colors cursor-pointer">Testimonials</Link></li>
          </ul>
        </div>
        <div className="flex flex-col">
          <h4 className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-white mb-5">Resources</h4>
          <ul className="list-none flex flex-col gap-3">
            <li><Link href="/callback" className="text-muted-dark hover:text-white text-[0.85rem] transition-colors cursor-pointer">Contact Us</Link></li>
             <li><a href="https://synergy.greatlab.io" className="text-muted-dark hover:text-white text-[0.85rem] transition-colors cursor-pointer">Customer Portal</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-[1140px] mx-auto mt-14 px-8 md:px-16 pt-7 border-t border-border-dark flex justify-between">
        <p className="text-[0.8rem] text-muted-dark">© 2026 Synergy 3D. All rights reserved.</p>
        <p className="flex items-center gap-1 text-[0.8rem] text-muted-dark">
           <MapPin className="w-3 h-3" />
          Made in New York
        </p>
      </div>
    </footer>
  );
};
export default Footer;
