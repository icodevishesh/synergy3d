import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { 
  ZirconiaSvg, AllOnXSvg, EmaxSvg, PfmSvg, SurgicalSvg, NightguardSvg, ModelsSvg 
} from '@/components/product-svgs';

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
    switch (product.id) {
      case 'zirconia': return <ZirconiaSvg className="w-[120px] h-[130px] sm:w-[200px] sm:h-[230px]" />;
      case 'allonx': return <AllOnXSvg className="w-[150px] h-[100px] sm:w-[300px] sm:h-[200px]" />;
      case 'emax': return <EmaxSvg className="w-[120px] h-[130px] sm:w-[200px] sm:h-[230px]" />;
      case 'pfm': return <PfmSvg className="w-[120px] h-[130px] sm:w-[200px] sm:h-[230px]" />;
      case 'surgical': return <SurgicalSvg className="w-[140px] h-[100px] sm:w-[280px] sm:h-[200px]" />;
      case 'nightguard': return <NightguardSvg className="w-[130px] h-[90px] sm:w-[260px] sm:h-[180px]" />;
      case 'models': return <ModelsSvg className="w-[130px] h-[90px] sm:w-[260px] sm:h-[180px]" />;
      default: return null;
    }
  };

  const getSmallVisual = (rid: string) => {
    switch (rid) {
      case 'zirconia': return <ZirconiaSvg className="w-8 h-9" />;
      case 'allonx': return <AllOnXSvg className="w-9 h-7" />;
      case 'emax': return <EmaxSvg className="w-8 h-9" />;
      case 'pfm': return <PfmSvg className="w-8 h-9" />;
      case 'surgical': return <SurgicalSvg className="w-9 h-7" />;
      case 'nightguard': return <NightguardSvg className="w-9 h-7" />;
      case 'models': return <ModelsSvg className="w-9 h-7" />;
      default: return null;
    }
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
      <section className="relative bg-navy pt-40 pb-20 overflow-hidden before:absolute before:inset-0 before:bg-radial-glow before:pointer-events-none">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)] bg-[size:50px_50px] pointer-events-none" />
        <div className="max-w-[1140px] mx-auto px-16 relative z-10">
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
      <section className="bg-white text-navy-text py-20">
        <div className="max-w-[1140px] mx-auto px-16 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* Dynamic SVG Blueprint */}
          <div className="block md:sticky top-28 bg-gray-50 border border-border-light rounded-[24px] aspect-square flex items-center justify-center p-12 overflow-hidden relative shadow-sm shrink-0 w-full">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(224,234,255,0.6)_0%,transparent_70%)] pointer-events-none" />
            <div className="relative z-10">{renderVisual()}</div>
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
              <Link href="/callback" className="inline-block bg-blue-default hover:bg-blue-bright text-white font-bold py-3.5 px-8 rounded-lg text-[0.95rem] transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
                Start a Case →
              </Link>
              <a className="inline-block border-1.5 border-blue/30 hover:border-blue bg-transparent hover:bg-blue-pale text-blue font-medium py-3 px-6 rounded-lg text-[0.92rem] transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
                Download Rx Form
              </a>
            </div>

            <p className="text-[0.8rem] text-gray-500 flex items-center gap-1.5 mb-6">
              <svg className="text-blue shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              Questions? Call us at <strong>&nbsp;+1 (800) 000-0000</strong> — 7 days a week.
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
      <section className="bg-off-white py-20 border-t border-border-light text-navy-text">
        <div className="max-w-[1140px] mx-auto px-16">
          <h2 className="font-serif text-3xl font-bold text-navy-text mb-9">You might also need</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {product.related.map((rid) => {
              const rp = PRODUCTS[rid];
              return (
                <Link 
                  key={rid}
                  href={`/products/${rid}`}
                  className="bg-white border-1.5 border-border-light rounded-2xl p-6 hover:shadow-premium hover:-translate-y-1 hover:border-blue/25 transition-all flex gap-4 items-center cursor-pointer group"
                >
                  <div className="w-14 h-14 bg-gray-50 border border-border-light rounded-xl flex items-center justify-center shrink-0">
                    {getSmallVisual(rid)}
                  </div>
                  <div>
                    <div className="text-[0.68rem] font-bold tracking-[0.1em] uppercase text-blue mb-1">{rp.cat}</div>
                    <div className="text-[0.95rem] font-semibold text-navy-text group-hover:text-blue transition-colors line-clamp-1">{rp.name}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="bg-gradient-to-br from-[#1344c4] to-[#0d2e9e] py-16 text-white text-center sm:text-left">
        <div className="max-w-[1140px] mx-auto px-16 flex flex-col sm:flex-row sm:items-center justify-between gap-10">
          <div>
            <h2 className="font-serif text-4xl font-bold leading-tight mb-2">
              Ready to order <em>{product.name}?</em>
            </h2>
            <p className="text-white/70 text-md">
              Send a scan in 60 seconds. Delivered in {product.specs[0].value.toLowerCase()}.
            </p>
          </div>
          <div className="flex flex-wrap gap-3.5 shrink-0 justify-center">
            <Link href="/callback" className="inline-block bg-white hover:bg-gray-50 text-blue-700 font-bold py-3.5 px-8 rounded-lg text-[0.95rem] shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
              Start a Case →
            </Link>
            <a className="inline-block bg-transparent hover:bg-white/6 text-white font-medium py-3.5 px-6 rounded-lg text-[0.92rem] border border-white/20 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
              Download Rx Form
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
