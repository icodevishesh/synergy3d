'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import imgZirconia from '@/app/assets/products/zirconia-crown.png';
import imgAllOnX from '@/app/assets/products/all-on-x-hybrid.png';
import imgEmax from '@/app/assets/products/emax-restoration.png';
import imgPFM from '@/app/assets/products/pmf.png';
import imgSurgical from '@/app/assets/products/surgical-guides.png';
import imgNightGuard from '@/app/assets/products/night-gaurds.png';
import imgModels from '@/app/assets/products/printed-models.png';

export default function ProductsPage() {
  const [filter, setFilter] = useState<'all' | 'crowns' | 'implants' | 'appliances'>('all');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'crowns', label: 'Crown & Bridge' },
    { id: 'implants', label: 'Implant Solutions' },
    { id: 'appliances', label: 'Appliances & Models' }
  ];

  const productCards = [
    { id: 'zirconia', filterCat: 'crowns', label: 'Crown & Bridge', desc: 'High-strength zirconia crowns milled to sub-30µm precision. Delivered in 5 days.', img: imgZirconia },
    { id: 'allonx', filterCat: 'implants', label: 'Implant Solutions', desc: 'Full-arch implant restorations — All-on-4, All-on-6, and custom hybrid frameworks.', img: imgAllOnX },
    { id: 'emax', filterCat: 'crowns', label: 'Ceramics', desc: 'Lithium disilicate for unmatched translucency and strength in anterior and posterior cases.', img: imgEmax },
    { id: 'pfm', filterCat: 'crowns', label: 'Ceramics', desc: 'Porcelain-fused-to-metal crowns offering durable strength with excellent aesthetics.', img: imgPFM },
    { id: 'surgical', filterCat: 'implants', label: 'Implant Solutions', desc: 'CBCT-based digitally planned implant surgical guides for precise, predictable placement.', img: imgSurgical },
    { id: 'nightguard', filterCat: 'appliances', label: 'Appliances', desc: 'Custom-milled hard and soft night guards for bruxism and TMJ protection.', img: imgNightGuard },
    { id: 'models', filterCat: 'appliances', label: 'Models & Dies', desc: 'High-accuracy 3D-printed study models and working dies for planning and fabrication.', img: imgModels }
  ];

  const filteredCards = productCards.filter(
    (card) => filter === 'all' || card.filterCat === filter
  );

  const triggerShipping = () => {
    window.dispatchEvent(new Event('open-shipping-modal'));
  };

  return (
    <div>
      {/* Page Hero */}
      <section className="relative bg-navy pt-40 pb-20 overflow-hidden before:absolute before:inset-0 before:bg-radial-glow before:pointer-events-none">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)] bg-[size:50px_50px] pointer-events-none" />
        <div className="max-w-[1140px] mx-auto px-6 md:px-16 relative z-10">
          <div className="flex gap-2 text-[0.8rem] text-white/45 mb-5">
            <Link href="/" className="hover:text-white/80">Home</Link>
            <span className="text-white/20">›</span>
            <span className="text-white/70">Lab Services</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-5 leading-[1.08]">
            Our <em className="text-blue-glow italic">Restoration</em> Menu
          </h1>
          <p className="text-md text-muted-dark max-w-[560px] leading-relaxed">
            Every product is milled in-house in our New York lab, using FDA-cleared materials — delivered in 5 business days.
          </p>
        </div>
      </section>

      {/* Category Filter Bar */}
      <div className="bg-white border-b border-border-light py-6 text-navy-text sticky top-[60px] z-[20]">
        <div className="max-w-[1140px] mx-auto px-6 md:px-16 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2.5 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id as any)}
                className={`px-5 py-2 rounded-full border-1.5 font-semibold text-[0.82rem] cursor-pointer transition-all ${
                  filter === cat.id
                    ? 'bg-blue-default border-blue-default text-white'
                    : 'bg-white border-border-light text-gray-500 hover:border-gray-300 hover:text-navy-text'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <span className="text-sm text-gray-500 font-semibold" id="filter-count">
            {filteredCards.length} product{filteredCards.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Products Grid */}
      <section className="bg-white text-navy-text py-16">
        <div className="max-w-[1140px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {filteredCards.map((card, i) => {
              const prod = PRODUCTS[card.id];
              return (
                <div
                  key={card.id}
                  className="reveal bg-white border-2 border-blue-200/40 hover:border-blue-700/30 rounded-2xl overflow-hidden hover:shadow-premium hover:-translate-y-1.5 transition-all duration-300 relative cursor-pointer flex flex-col group"
                >
                  <Link href={`/products/${card.id}`} className="absolute inset-0 z-[5]" />
                  <div className="aspect-[4/3] bg-white border-b border-gray-200 flex items-center justify-center p-8 relative overflow-hidden shrink-0">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(224,234,255,0.5)_0%,transparent_75%)]" />
                    <div className="w-full h-full absolute inset-0 transition-transform group-hover:scale-105 duration-300 p-8">
                      <Image src={card.img} alt={prod.name} fill className="object-contain p-8" sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-[0.67rem] font-bold tracking-[0.13em] uppercase text-blue-600 mb-2">{card.label}</span>
                    <h3 className="font-serif text-xl font-bold text-navy-text mb-2.5 leading-snug">{prod.name}</h3>
                    <p className="text-[0.82rem] text-gray-500 leading-relaxed mb-5">{card.desc}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 text-[0.88rem] font-bold text-blue-600 group-hover:gap-2.5 transition-all">
                      View details <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full border-1.5 border border-blue-200/40 flex items-center justify-center text-blue-900/80 group-hover:bg-blue-600/10 group-hover:border-blue group-hover:text-blue-600 transition-all group-hover:rotate-[-45deg] duration-250">
                    <ArrowRight size={14} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="bg-gradient-to-br from-[#1344c4] to-[#0d2e9e] py-16 text-white text-center sm:text-left">
        <div className="max-w-[1140px] mx-auto px-6 md:px-16 flex flex-col sm:flex-row sm:items-center justify-between gap-10">
          <div>
            <h2 className="font-serif text-4xl font-bold leading-tight mb-2">
              Ready to send your <em className="italic font-normal">first case?</em>
            </h2>
            <p className="text-white/70 text-md">
              Let our expert team handle everything — scan to delivery in 5 days flat.
            </p>
          </div>
          <div className="flex flex-wrap gap-3.5 shrink-0 justify-center">
            <Link href="/callback" className="inline-block bg-white hover:bg-gray-50 text-blue-700 font-bold py-3.5 px-8 rounded-lg text-[0.95rem] shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
              Start a Case →
            </Link>
            <button 
              onClick={triggerShipping}
              className="inline-block bg-transparent hover:bg-white/6 text-white font-medium py-3.5 px-6 rounded-lg text-[0.92rem] border border-white/20 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              Get Shipping Label
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
