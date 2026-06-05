import { Product } from '@/types';

export const PRODUCTS: Record<string, Product> = {
  zirconia: {
    id: 'zirconia',
    cat: 'Crown & Bridge',
    name: 'Zirconia Crowns',
    tagline: 'Precision-milled <em>monolithic zirconia.</em>',
    lead: 'Our full-contour zirconia crowns are milled from premium 5Y-PSZ and 3Y-TZP blanks using 5-axis CAD/CAM milling. Each restoration is sintered, polished, and stain-characterized in our New York lab — guaranteed in 5 business days.',
    specs: [
      { label: 'Turnaround', value: '5 Business Days' },
      { label: 'Fit Accuracy', value: 'Sub-30µm' },
      { label: 'Material', value: '5Y-PSZ / 3Y-TZP' },
      { label: 'Shade System', value: 'VITA Classical' }
    ],
    features: [
      'High translucency options for anterior aesthetics',
      'High-strength grades for posterior load-bearing cases',
      'Layered zirconia available for premium cases',
      'FDA-cleared, biocompatible, BPA-free',
      'Compatible with all major implant systems',
      'Rush 3-day option available'
    ],
    related: ['allonx', 'emax', 'pfm'],
    svgId: 'svg-z'
  },
  allonx: {
    id: 'allonx',
    cat: 'Implant Solutions',
    name: 'All-on-X Hybrids',
    tagline: 'Full-arch implant restorations, <em>milled in-house.</em>',
    lead: 'Our All-on-X hybrid frameworks are designed using full digital workflow — from CBCT scan to final milled prosthesis. Available in zirconia, PMMA, and titanium-bar combinations for All-on-4 and All-on-6 cases.',
    specs: [
      { label: 'Turnaround', value: '7–10 Business Days' },
      { label: 'Framework', value: 'Ti-bar + Zirconia' },
      { label: 'Arch Options', value: 'All-on-4, All-on-6' },
      { label: 'Connection', value: 'All Major Systems' }
    ],
    features: [
      'Screw-retained hybrid design for retrievability',
      'Digital bite verification protocol included',
      'Titanium bar milled for maximum strength',
      'Zirconia or PMMA tooth portion options',
      'Pink porcelain gingival simulation',
      'Multi-unit abutment compatible'
    ],
    related: ['surgical', 'zirconia', 'emax'],
    svgId: 'svg-a'
  },
  emax: {
    id: 'emax',
    cat: 'Ceramics',
    name: 'e.max Restorations',
    tagline: 'Lithium disilicate — <em>the gold standard.</em>',
    lead: 'IPS e.max is the world\'s leading ceramic system, combining exceptional strength (400 MPa) with outstanding optical properties. Ideal for veneers, inlays, onlays, and anterior and posterior crowns requiring natural-looking translucency.',
    specs: [
      { label: 'Turnaround', value: '5 Business Days' },
      { label: 'Material', value: 'IPS e.max CAD' },
      { label: 'Flexural Strength', value: '≥ 400 MPa' },
      { label: 'Shade System', value: 'VITA / Bleach' }
    ],
    features: [
      'High translucency for lifelike natural aesthetics',
      'Available as pressable or CAD/CAM milled',
      'Ideal for veneers, crowns, inlays, and onlays',
      'Stain- and glaze-characterized by expert technicians',
      'Minimum thickness: 0.4mm for veneers',
      'Anterior and posterior applications'
    ],
    related: ['zirconia', 'pfm', 'allonx'],
    svgId: 'svg-e'
  },
  pfm: {
    id: 'pfm',
    cat: 'Ceramics',
    name: 'PFM Crowns',
    tagline: 'Proven strength. <em>Reliable aesthetics.</em>',
    lead: 'Porcelain-fused-to-metal crowns remain a gold standard for posterior restorations requiring maximum strength. Our PFMs are fired over high-noble or semi-precious metal frameworks using premium feldspathic porcelain.',
    specs: [
      { label: 'Turnaround', value: '5 Business Days' },
      { label: 'Framework', value: 'High-Noble / Semi-Precious' },
      { label: 'Porcelain', value: 'Feldspathic' },
      { label: 'Shade System', value: 'VITA Classical' }
    ],
    features: [
      'High-noble metal framework for exceptional biocompatibility',
      'Ideal for high-load posterior bridges',
      'Multiple pontic designs available',
      'Metal occlusal option for bruxers',
      'Precision-fit margins with minimal prep requirements',
      'Full-cast metal option also available'
    ],
    related: ['zirconia', 'emax', 'nightguard'],
    svgId: 'svg-p'
  },
  surgical: {
    id: 'surgical',
    cat: 'Implant Solutions',
    name: 'Surgical Guides',
    tagline: 'Digitally planned. <em>Precisely placed.</em>',
    lead: 'Our CBCT-based surgical guides are planned using the latest implant planning software and 3D-printed in dental-grade resin. Fully guided, pilot-only, or open-guided options available for single, multiple, and full-arch cases.',
    specs: [
      { label: 'Turnaround', value: '3–5 Business Days' },
      { label: 'Planning', value: 'CBCT + IOS Required' },
      { label: 'Guide Type', value: 'Fully / Pilot / Open' },
      { label: 'Compatibility', value: 'All Major Systems' }
    ],
    features: [
      'CBCT-based virtual implant planning included',
      'Tissue-supported, tooth-supported, or bone-supported',
      'Printed in biocompatible surgical-grade resin',
      'Compatible with all major implant systems and kits',
      'Single, partial, and full-arch options',
      'Verification jig available on request'
    ],
    related: ['allonx', 'models', 'zirconia'],
    svgId: 'svg-s'
  },
  nightguard: {
    id: 'nightguard',
    cat: 'Appliances',
    name: 'Night Guards',
    tagline: 'Custom-milled protection. <em>Perfect fit.</em>',
    lead: 'Our CAD/CAM-milled night guards and occlusal splints are fabricated from premium hard acrylic or dual-laminate materials, precisely adapted to the patient\'s dentition from a digital scan for a far more accurate fit than pressure-formed guards.',
    specs: [
      { label: 'Turnaround', value: '3–5 Business Days' },
      { label: 'Material', value: 'Hard Acrylic / Dual-Lam' },
      { label: 'Arch', value: 'Upper or Lower' },
      { label: 'Thickness', value: '2mm / 3mm / 4mm' }
    ],
    features: [
      'CAD/CAM milled for precise occlusal adaptation',
      'Hard, soft, and dual-laminate options',
      'Upper or lower arch — full or partial coverage',
      'Smooth, polished finish for patient comfort',
      'Can be fabricated from digital IOS scan',
      'Bruxism, TMJD, and bleaching tray options'
    ],
    related: ['pfm', 'models', 'surgical'],
    svgId: 'svg-n'
  },
  models: {
    id: 'models',
    cat: 'Models & Dies',
    name: 'Printed Models & Dies',
    tagline: 'High-accuracy models. <em>Digital precision.</em>',
    lead: 'Our 3D-printed study models and working dies are produced on professional-grade dental printers using biocompatible, high-accuracy resins — accurate to within 50µm. Ideal for planning, patient communication, and full-arch restoration fabrication.',
    specs: [
      { label: 'Turnaround', value: '2–3 Business Days' },
      { label: 'Accuracy', value: '± 50µm' },
      { label: 'Material', value: 'Dental-Grade Resin' },
      { label: 'Format', value: 'STL / OBJ accepted' }
    ],
    features: [
      'Study models, working dies, and diagnostic wax-ups',
      'Gingival mask models for restorative cases',
      'Full-arch and quadrant options',
      'Biocompatible, ADA-compliant resins',
      'Articulated model sets available',
      'Can be paired with clear aligner or surgical guide orders'
    ],
    related: ['surgical', 'allonx', 'nightguard'],
    svgId: 'svg-m'
  }
};
