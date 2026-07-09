'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import JsonLd from "@/components/JsonLd";
import { labServiceSchema } from "@/lib/schema/lab-service";
import { PRODUCTS } from '@/data/products';
import imgZirconia from '@/app/assets/products/zirconia-crown.png';
import imgAllOnX from '@/app/assets/products/all-on-x-hybrid.png';
import imgEmax from '@/app/assets/products/emax-restoration.png';
import imgPFM from '@/app/assets/products/pmf.png';
import imgSurgical from '@/app/assets/products/surgical-guides.png';
import imgNightGuard from '@/app/assets/products/night-gaurds.png';
import imgModels from '@/app/assets/products/printed-models.png';

import imgZirconiaHybridCustomAbutment from '@/app/assets/products/new-zirconia-hybrid-custom-abutment-poster.png';
import imgWaxUp from '@/app/assets/products/wax_up_poster.png';
import imgTitaniumCustomAbutments from '@/app/assets/products/new-titanium-custom-abutments-poster.png';
import imgFullContourZirconia from '@/app/assets/products/full-contour-zirconia-poster.png';
import imgAcrylicDenture from '@/app/assets/products/new-acrylic-denture-poster.png';
import imgAcrylicPartial from '@/app/assets/products/acrylic-partial-poster.png';
import imgPartialMetalFramework from '@/app/assets/products/partial_metal_framework_poster.png';
import imgTemporaries from '@/app/assets/products/Temporaries-poster.png';
import imgScrewRetainedZirconiaBridge from '@/app/assets/products/updated_screw_retained_zirconia_bridge_poster.png';
import imgScrewRetainedPMMABridge from '@/app/assets/products/pmma_screw_retained_hybrid_poster.png';
import imgProcessImplantAcrylicDenture from '@/app/assets/products/updated_process_Implant_poster.png';
import imgPorcelainFusedToZirconia from '@/app/assets/products/Porcelain-Fused-to-Zirconia-poster-1.png';
import imgMillableFlexiblePartials from '@/app/assets/products/rpd_flexi_poster.png';
import imgScrewmentableCrownAbutmentWithScrewChannelCrown from '@/app/assets/products/new-screwmentable-crown-poster-1.png';
import imgZirconiaScrewRetainedCrownWithTiBase from '@/app/assets/products/zirconia_screw_retained_crown_w_ti_base_poster-1.png';
import imgFlexiblePartials from '@/app/assets/products/rpd_flexi_poster.png';
import imgZirconiaHybrid from '@/app/assets/products/zirconia_hybrid_poster.png';
import imgScrewRetainedBridge from '@/app/assets/products/updated_screw_retained_bridge_poster.png';
import imgTemporaryBridge from '@/app/assets/products/updated_temporary_bridge_poster.png';
import imgScrewmentable from '@/app/assets/products/screwmentable-1.png-1.png';

export default function ProductsPage() {
  const [filter, setFilter] = useState<'all' | 'crowns' | 'implants' | 'appliances'>('all');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'crowns', label: 'Crown & Bridge' },
    { id: 'implants', label: 'Implant Solutions' },
    { id: 'appliances', label: 'Appliances & Models' }
  ];

  const productCards = [
    { id: 'zirconia-crowns', filterCat: 'crowns', label: 'Crown & Bridge', desc: 'High-strength zirconia crowns milled to sub-30µm precision. Delivered in 5 days.', img: imgZirconia },
    { id: 'all-on-x-hybrids', filterCat: 'implants', label: 'Implant Solutions', desc: 'Full-arch implant restorations — All-on-4, All-on-6, and custom hybrid frameworks.', img: imgAllOnX },
    { id: 'e-max-restorations', filterCat: 'crowns', label: 'Ceramics', desc: 'Lithium disilicate for unmatched translucency and strength in anterior and posterior cases.', img: imgEmax },
    { id: 'pfm-crowns', filterCat: 'crowns', label: 'Ceramics', desc: 'Porcelain-fused-to-metal crowns offering durable strength with excellent aesthetics.', img: imgPFM },
    { id: 'surgical-guides', filterCat: 'implants', label: 'Implant Solutions', desc: 'CBCT-based digitally planned implant surgical guides for precise, predictable placement.', img: imgSurgical },
    { id: 'night-guards', filterCat: 'appliances', label: 'Appliances', desc: 'Custom-milled hard and soft night guards for bruxism and TMJ protection.', img: imgNightGuard },
    { id: 'printed-models-dies', filterCat: 'appliances', label: 'Models & Dies', desc: 'High-accuracy 3D-printed study models and working dies for planning and fabrication.', img: imgModels },
    { id: 'zirconia-hybrid-custom-abutment', filterCat: 'implants', label: 'Implant Solutions', desc: 'Combine titanium strength with zirconia aesthetics for bespoke restorations.', img: imgZirconiaHybridCustomAbutment },
    { id: 'wax-up', filterCat: 'appliances', label: 'Models & Dies', desc: 'Preparatory models for fit, form, and aesthetic verification prior to fabrication.', img: imgWaxUp },
    { id: 'titanium-custom-abutments', filterCat: 'implants', label: 'Implant Solutions', desc: 'Custom-designed titanium abutments for a stable base and custom fit.', img: imgTitaniumCustomAbutments },
    { id: 'full-contour-zirconia', filterCat: 'crowns', label: 'Ceramics', desc: 'Highest strength ceramic restoration, ideal for bruxers and grinders.', img: imgFullContourZirconia },
    { id: 'acrylic-denture', filterCat: 'appliances', label: 'Appliances', desc: 'Durable, moldable full dentures that adapt comfortably over time.', img: imgAcrylicDenture },
    { id: 'acrylic-partial', filterCat: 'appliances', label: 'Appliances', desc: 'Low-cost and practical partial denture solution for missing teeth.', img: imgAcrylicPartial },
    { id: 'partial-metal-framework', filterCat: 'appliances', label: 'Appliances', desc: 'Detachable partial dentures on a solid base of high-quality alloys.', img: imgPartialMetalFramework },
    { id: 'temporaries', filterCat: 'crowns', label: 'Crown & Bridge', desc: 'Interim crowns, bridges, and dentures for functional aesthetics.', img: imgTemporaries },
    { id: 'screw-retained-zirconia-bridge', filterCat: 'implants', label: 'Implant Solutions', desc: 'Full arch zirconia bridge combining exceptional strength and beauty.', img: imgScrewRetainedZirconiaBridge },
    { id: 'screw-retained-pmma-bridge', filterCat: 'implants', label: 'Implant Solutions', desc: 'Full-arch PMMA bridge, flexible and highly resistant to wear.', img: imgScrewRetainedPMMABridge },
    { id: 'process-implant-acrylic-denture', filterCat: 'implants', label: 'Implant Solutions', desc: 'Acrylic dentures with implant attachments for custom, stable fit.', img: imgProcessImplantAcrylicDenture },
    { id: 'porcelain-fused-to-zirconia', filterCat: 'crowns', label: 'Ceramics', desc: 'Combine zirconia durability with premium feldspathic porcelain aesthetics.', img: imgPorcelainFusedToZirconia },
    { id: 'millable-flexible-partials', filterCat: 'appliances', label: 'Appliances', desc: 'Novel lightweight partial dentures combining flexibility and strength.', img: imgMillableFlexiblePartials },
    { id: 'screwmentable-crown-abutment-with-screw-channel-crown', filterCat: 'implants', label: 'Implant Solutions', desc: 'Secure titanium abutments combined with retrievable screw channel crowns.', img: imgScrewmentableCrownAbutmentWithScrewChannelCrown },
    { id: 'zirconia-screw-retained-crown-with-ti-base', filterCat: 'implants', label: 'Implant Solutions', desc: 'Zirconia crown on a titanium base for stable, retrievable restorations.', img: imgZirconiaScrewRetainedCrownWithTiBase },
    { id: 'flexible-partials', filterCat: 'appliances', label: 'Appliances', desc: 'Removable prosthetics flexing to fit without metal clasps.', img: imgFlexiblePartials },
    { id: 'zirconia-hybrid', filterCat: 'implants', label: 'Implant Solutions', desc: 'Full arch zirconia hybrid combining strength and beautiful aesthetics.', img: imgZirconiaHybrid },
    { id: 'screw-retained-bridge', filterCat: 'implants', label: 'Implant Solutions', desc: 'Milled bridge providing a secure, stable connection to the jawbone.', img: imgScrewRetainedBridge },
    { id: 'temporary-bridge', filterCat: 'crowns', label: 'Crown & Bridge', desc: 'Short-term solution matching natural tooth color during healing.', img: imgTemporaryBridge },
    { id: 'screwmentable', filterCat: 'implants', label: 'Implant Solutions', desc: 'Screw-retained crown designed on a custom abutment for perfect fit.', img: imgScrewmentable }
  ];

  const filteredCards = productCards.filter(
    (card) => filter === 'all' || card.filterCat === filter
  );

  const triggerShipping = () => {
    window.dispatchEvent(new Event('open-shipping-modal'));
  };

  return (
    <div>
      <JsonLd data={labServiceSchema} />
      {/* Page Hero */}
      <section className="relative bg-navy pt-22 md:pt-40 pb-10 md:pb-20 overflow-hidden before:absolute before:inset-0 before:bg-radial-glow before:pointer-events-none">
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
      <div className="bg-white border-b border-border-light py-4 text-navy-text sticky top-[60px] z-[20]">
        <div className="max-w-[1140px] mx-auto px-6 md:px-16 flex items-center justify-between gap-4 flex-nowrap md:flex-wrap">
          <div className="flex items-center gap-2.5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex-nowrap md:flex-wrap w-full md:w-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id as any)}
                className={`shrink-0 px-5 py-2 rounded-full border-1.5 font-semibold text-[0.82rem] cursor-pointer transition-all ${
                  filter === cat.id
                    ? 'bg-blue-default border-blue-default text-white'
                    : 'bg-white border-border-light text-gray-500 hover:border-gray-300 hover:text-navy-text'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <span className="text-sm text-gray-500 font-semibold hidden md:inline-block" id="filter-count">
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
                  className="reveal bg-blue-pale/40 border border-blue-200/50 hover:border-blue-300/80 rounded-2xl overflow-hidden hover:shadow-premium hover:-translate-y-1.5 hover:bg-blue-pale/60 transition-all duration-300 relative cursor-pointer flex flex-col group"
                >
                  <Link href={`/lab-services/products/${card.id}`} className="absolute inset-0 z-[5]" />
                  <div className="aspect-[4/3] bg-gradient-to-b from-white to-blue-pale/35 border-b border-blue-200/50 flex items-center justify-center p-8 relative overflow-hidden shrink-0">
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
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-blue-default/20 bg-white text-blue-default flex items-center justify-center hover:bg-blue-default hover:text-white hover:border-blue-default transition-all duration-300 shadow-sm z-[10] group-hover:rotate-[-45deg] duration-250">
                    <ArrowRight size={14} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="bg-gradient-to-br from-[#1344c4] to-[#0d2e9e] py-12 md:py-16 text-white text-center sm:text-left">
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
            <a href="https://synergy.greatlab.io/login" target="_blank" rel="noopener noreferrer" className="inline-block bg-white hover:bg-gray-50 text-blue-700 font-bold py-3.5 px-8 rounded-lg text-[0.95rem] shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center">
              Start a Case →
            </a>
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
