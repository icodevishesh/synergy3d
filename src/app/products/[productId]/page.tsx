import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
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

const PRODUCT_IMAGES: Record<string, StaticImageData> = {
  'zirconia-crowns': imgZirconia,
  'all-on-x-hybrids': imgAllOnX,
  'e-max-restorations': imgEmax,
  'pfm-crowns': imgPFM,
  'surgical-guides': imgSurgical,
  'night-guards': imgNightGuard,
  'printed-models-dies': imgModels,
  'zirconia-hybrid-custom-abutment': imgZirconiaHybridCustomAbutment,
  'wax-up': imgWaxUp,
  'titanium-custom-abutments': imgTitaniumCustomAbutments,
  'full-contour-zirconia': imgFullContourZirconia,
  'acrylic-denture': imgAcrylicDenture,
  'acrylic-partial': imgAcrylicPartial,
  'partial-metal-framework': imgPartialMetalFramework,
  'temporaries': imgTemporaries,
  'screw-retained-zirconia-bridge': imgScrewRetainedZirconiaBridge,
  'screw-retained-pmma-bridge': imgScrewRetainedPMMABridge,
  'process-implant-acrylic-denture': imgProcessImplantAcrylicDenture,
  'porcelain-fused-to-zirconia': imgPorcelainFusedToZirconia,
  'millable-flexible-partials': imgMillableFlexiblePartials,
  'screwmentable-crown-abutment-with-screw-channel-crown': imgScrewmentableCrownAbutmentWithScrewChannelCrown,
  'zirconia-screw-retained-crown-with-ti-base': imgZirconiaScrewRetainedCrownWithTiBase,
  'flexible-partials': imgFlexiblePartials,
  'zirconia-hybrid': imgZirconiaHybrid,
  'screw-retained-bridge': imgScrewRetainedBridge,
  'temporary-bridge': imgTemporaryBridge,
  'screwmentable': imgScrewmentable,
};

interface ProductPageProps {
  params: Promise<{
    productId: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(PRODUCTS).map((key) => ({
    productId: key,
  }));
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { productId } = await params;
  const product = PRODUCTS[productId];

  if (!product) {
    notFound();
  }

  const renderVisual = () => {
    const img = PRODUCT_IMAGES[product.id];
    if (!img) return null;
    return <Image src={img} alt={product.name} fill className="object-contain p-12 z-10" sizes="(max-width: 1024px) 100vw, 50vw" />;
  };

  const getSmallVisual = (rid: string) => {
    const img = PRODUCT_IMAGES[rid];
    if (!img) return null;
    return <Image src={img} alt={rid} fill className="object-contain p-2" sizes="56px" />;
  };

  const renderRelatedCard = (rid: string, isCarousel = false) => {
    const rp = PRODUCTS[rid];
    if (!rp) return null;
    const img = PRODUCT_IMAGES[rid];
    return (
      <Link
        key={rid}
        href={`/products/${rid}`}
        className={`bg-white border border-border-light rounded-2xl p-5 hover:shadow-premium hover:-translate-y-1.5 hover:border-blue/25 transition-all duration-300 flex flex-col gap-4 cursor-pointer group ${
          isCarousel ? 'w-[260px] shrink-0 snap-start scroll-mx-8' : 'w-full'
        }`}
      >
        <div className="aspect-[4/3] w-full bg-gray-50 border border-border-light rounded-xl flex items-center justify-center relative overflow-hidden p-2 shrink-0">
          {img && (
            <Image
              src={img}
              alt={rp.name}
              fill
              className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
              sizes={isCarousel ? "(max-width: 768px) 100vw, 33vw" : "(max-width: 768px) 100vw, 33vw"}
            />
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-blue-700 mb-1">{rp.cat}</span>
          <h3 className="text-[1rem] font-semibold text-navy-text group-hover:text-blue transition-colors line-clamp-1">{rp.name}</h3>
        </div>
      </Link>
    );
  };
  const renderTagline = (text: string) => {
    const parts = text.split(/(<em>|<\/em>)/g);
    let isItalic = false;
    return parts.map((part, index) => {
      if (part === '<em>') {
        isItalic = true;
        return null;
      }
      if (part === '</em>') {
        isItalic = false;
        return null;
      }
      if (isItalic) {
        return (
          <span key={index} className="text-blue-glow italic font-serif">
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div>
      {/* Page Hero */}
      <section className="relative bg-navy pt-22 md:pt-40 pb-10 md:pb-20 overflow-hidden before:absolute before:inset-0 before:bg-radial-glow before:pointer-events-none">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)] bg-[size:50px_50px] pointer-events-none" />
        <div className="max-w-[1140px] mx-auto px-8 md:px-16 relative z-10">
          <div className="flex gap-2 text-[0.8rem] text-white/45 mb-5">
            <Link href="/" className="hover:text-white/80">Home</Link>
            <span className="text-white/20">›</span>
            <Link href="/products" className="hover:text-white/80">Lab Services</Link>
            <span className="text-white/20">›</span>
            <span className="text-white/70">{product.name}</span>
          </div>
          <span className="inline-block text-xs font-bold tracking-[0.15em] uppercase text-blue-glow mb-4">
            {product.cat}
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-5 leading-[1.08] max-w-200 mr-auto">
            {renderTagline(product.tagline)}
          </h1>
        </div>
      </section>

      {/* Main Details Grid */}
      <section className="bg-white text-navy-text py-12 md:py-20">
        <div className="max-w-[1140px] mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* Dynamic SVG Blueprint */}
          <div className="block md:sticky top-8 md:top-28 bg-gray-50 border border-border-light rounded-[24px] aspect-square flex items-center justify-center p-12 overflow-hidden relative shadow-sm shrink-0 w-full">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(224,234,255,0.6)_0%,transparent_70%)] pointer-events-none" />
            <div className="relative z-10 w-full h-full">{renderVisual()}</div>
          </div>

          {/* Description Content */}
          <div className="pt-2">
            <span className="inline-block text-[0.72rem] font-bold tracking-[0.15em] uppercase text-blue mb-4">
              {product.cat}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0a1530] mb-5 leading-tight">{product.name}</h2>
            <p className="text-[1.05rem] text-gray-500 leading-relaxed mb-9">{product.lead}</p>

            {/* Spec Cards */}
            <div className="grid grid-cols-2 gap-4 mb-9">
              {product.specs.map((spec, index) => (
                <div key={index} className="bg-off-white border border-border-light rounded-xl p-5">
                  <div className="text-[0.7rem] font-bold tracking-wider uppercase text-muted-dark mb-1">{spec.label}</div>
                  <div className="text-[1rem] font-semibold text-navy-text">{spec.value}</div>
                </div>
              ))}
            </div>

            {/* What's Included Feature List */}
            <div className="mb-9">
              <h4 className="text-[0.88rem] font-bold text-navy-text mb-4.5 tracking-wider uppercase">What's included</h4>
              <div className="flex flex-col gap-2.5">
                {product.features.map((feat, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-default flex items-center justify-center shrink-0 mt-0.5">
                      <svg viewBox="0 0 10 10" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5">
                        <polyline points="1.5,5 4,7.5 8.5,2.5" />
                      </svg>
                    </div>
                    <span className="text-[0.88rem] text-[#374263] leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3.5 mb-6">
              <a href="https://synergy.greatlab.io/login" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-default hover:bg-blue-bright text-white font-bold py-3.5 px-8 rounded-lg text-[0.95rem] transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center">
                Start a Case →
              </a>
              <a href="https://synergy3d.net/wp-content/uploads/2025/03/synegy-script.pdf" target="_blank" rel="noopener noreferrer" className="inline-block border-1.5 border-blue/30 hover:border-blue bg-transparent hover:bg-blue-pale text-blue font-medium py-3 px-6 rounded-lg text-[0.92rem] transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center">
                Download Rx Form
              </a>
            </div>

            <p className="text-[0.8rem] text-gray-500 flex items-center gap-1.5 mb-6">
              <svg className="text-blue shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              Questions? Call us at <strong>&nbsp;+1 8454471807</strong> — 7 days a week.
            </p>

            <div className="border-t border-border-light pt-8 mt-2">
              <h4 className="text-[0.78rem] font-bold tracking-widest text-[#8a9abf] uppercase mb-3.5">Compatible Scanners</h4>
              <div className="flex flex-wrap gap-2">
                {['iTero', '3Shape', 'Medit', 'Carestream', 'Dexis', 'Sirona', 'Planmeca'].map((sc) => (
                  <span key={sc} className="bg-gray-100 border border-border-light rounded-md px-3.5 py-1.5 text-[0.8rem] font-semibold text-gray-700">
                    {sc}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Related Products Section */}
      <section className="bg-off-white py-12 md:py-20 border-t border-border-light text-navy-text">
        <div className="max-w-[1140px] mx-auto px-8 md:px-16">
          <h2 className="font-serif text-3xl font-bold text-navy-text mb-9">You might also need</h2>
          
          {/* Desktop View */}
          <div className="hidden md:grid grid-cols-3 gap-5">
            {product.related.map((rid) => renderRelatedCard(rid, false))}
          </div>

          {/* Mobile View (Carousel) */}
          <div className="flex md:hidden overflow-x-auto snap-x snap-mandatory pb-6 gap-5 -mx-8 px-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="w-1 shrink-0" />
            {product.related.map((rid) => renderRelatedCard(rid, true))}
            <div className="w-1 shrink-0" />
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="bg-gradient-to-br from-[#1344c4] to-[#0d2e9e] py-12 md:py-16 text-white text-center sm:text-left">
        <div className="max-w-[1140px] mx-auto px-8 md:px-16 flex flex-col sm:flex-row sm:items-center justify-between gap-10">
          <div>
            <h2 className="font-serif text-4xl font-bold leading-tight mb-2">
              Ready to order <em>{product.name}?</em>
            </h2>
            <p className="text-white/70 text-md">
              Send a scan in 60 seconds. Delivered in {product.specs[0].value.toLowerCase()}.
            </p>
          </div>
          <div className="flex flex-wrap gap-3.5 shrink-0 justify-center">
            <a href="https://synergy.greatlab.io/login" target="_blank" rel="noopener noreferrer" className="inline-block bg-white hover:bg-gray-50 text-blue-700 font-bold py-3.5 px-8 rounded-lg text-[0.95rem] shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center">
              Start a Case →
            </a>
            <a href="https://synergy3d.net/wp-content/uploads/2025/03/synegy-script.pdf" target="_blank" rel="noopener noreferrer" className="inline-block bg-transparent hover:bg-white/6 text-white font-medium py-3.5 px-6 rounded-lg text-[0.92rem] border border-white/20 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center">
              Download Rx Form
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
