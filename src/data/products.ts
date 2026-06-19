import { Product } from '@/types';

export const PRODUCTS: Record<string, Product> = {
  'zirconia-crowns': {
    id: 'zirconia-crowns',
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
    related: ['all-on-x-hybrids', 'e-max-restorations', 'pfm-crowns'],
    svgId: 'svg-z'
  },
  'all-on-x-hybrids': {
    id: 'all-on-x-hybrids',
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
    related: ['surgical-guides', 'zirconia-crowns', 'e-max-restorations'],
    svgId: 'svg-a'
  },
  'e-max-restorations': {
    id: 'e-max-restorations',
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
    related: ['zirconia-crowns', 'pfm-crowns', 'all-on-x-hybrids'],
    svgId: 'svg-e'
  },
  'pfm-crowns': {
    id: 'pfm-crowns',
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
    related: ['zirconia-crowns', 'e-max-restorations', 'night-guards'],
    svgId: 'svg-p'
  },
  'surgical-guides': {
    id: 'surgical-guides',
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
    related: ['all-on-x-hybrids', 'printed-models-dies', 'zirconia-crowns'],
    svgId: 'svg-s'
  },
  'night-guards': {
    id: 'night-guards',
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
    related: ['pfm-crowns', 'printed-models-dies', 'surgical-guides'],
    svgId: 'svg-n'
  },
  'printed-models-dies': {
    id: 'printed-models-dies',
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
    related: ['surgical-guides', 'all-on-x-hybrids', 'night-guards'],
    svgId: 'svg-m'
  },
  'zirconia-hybrid-custom-abutment': {
    id: 'zirconia-hybrid-custom-abutment',
    cat: 'Implant Solutions',
    name: 'Zirconia Hybrid Custom Abutment',
    tagline: 'Strength meets beauty — <em>zirconia on titanium.</em>',
    lead: 'Zirconia hybrid custom abutments combine the strength of titanium with the aesthetics of zirconia. These bespoke abutments are tailored to each patient’s specific implant, providing a long-lasting and natural-looking option for implant restorations. The zirconia material has a tooth-like look, and the titanium foundation ensures strength and stability. This hybrid design provides the best of both worlds, making it suitable for patients who value both aesthetics and functionality.',
    specs: [
      { label: 'Turnaround', value: '5–7 Business Days' },
      { label: 'Material', value: 'Zirconia + Titanium Base' },
      { label: 'Fit Accuracy', value: 'Sub-30µm' }
    ],
    features: [
      'Tooth-like ceramic aesthetic',
      'High-strength titanium base',
      'Tailored to specific implant alignment'
    ],
    related: ['titanium-custom-abutments', 'zirconia-screw-retained-crown-with-ti-base', 'all-on-x-hybrids'],
    svgId: 'svg-a'
  },
  'wax-up': {
    id: 'wax-up',
    cat: 'Models & Dies',
    name: 'Wax Up',
    tagline: 'Perfect diagnostic planning, <em>waxed or digital.</em>',
    lead: 'A wax-up is a preparatory model used in the planning phase of dental repair. Made of wax or from a digital model, it allows the dentist to see the ultimate result before fabricating the actual restorative. This procedure is critical to assuring the proper fit, form, and aesthetics of crowns, bridges, or dentures. Wax-ups are also an effective tool for patient consultation, letting the dentist show the patient how the final restoration will look and make revisions as needed.',
    specs: [
      { label: 'Turnaround', value: '3 Business Days' },
      { label: 'Material', value: 'Diagnostic Wax / Digital Resin' }
    ],
    features: [
      'Assures proper fit, form, and aesthetics',
      'Effective tool for patient consultation',
      'Allows revision prior to final fabrication'
    ],
    related: ['printed-models-dies', 'temporaries', 'temporary-bridge'],
    svgId: 'svg-m'
  },
  'titanium-custom-abutments': {
    id: 'titanium-custom-abutments',
    cat: 'Implant Solutions',
    name: 'Titanium Custom Abutments',
    tagline: 'High-quality titanium base, <em>custom-designed.</em>',
    lead: 'Titanium custom abutments give a solid base for implant restorations. These abutments are custom-designed to fit each patient’s unique dental architecture and are composed of high-quality titanium, ensuring a secure and stable fit. Titanium’s biocompatibility and strength make it a great material for abutments, ensuring long-term success in implant-supported restorations. These abutments are very valuable for individuals who require a customized solution to ensure proper fit and performance.',
    specs: [
      { label: 'Turnaround', value: '5 Business Days' },
      { label: 'Material', value: 'Medical Grade 5 Titanium' },
      { label: 'Connection', value: 'All Major Systems' }
    ],
    features: [
      'Custom designed for unique architecture',
      'Biocompatible and highly durable',
      'Ensures long-term success of restorations'
    ],
    related: ['zirconia-hybrid-custom-abutment', 'screwmentable-crown-abutment-with-screw-channel-crown', 'all-on-x-hybrids'],
    svgId: 'svg-a'
  },
  'full-contour-zirconia': {
    id: 'full-contour-zirconia',
    cat: 'Ceramics',
    name: 'Full Contour Zirconia',
    tagline: 'Highest strength ceramic, <em>ideal for bruxers.</em>',
    lead: 'Full Contour Zirconia offers the highest strength of any ceramic restoration. It is an aesthetic solution for bruxer’s and grinders, as it is still gentle enough to protect Bruxers’ opposing enamel.',
    specs: [
      { label: 'Turnaround', value: '5 Business Days' },
      { label: 'Material', value: 'Monolithic Zirconia' },
      { label: 'Strength', value: '1200 MPa' }
    ],
    features: [
      'Extreme fracture resistance',
      'Gentle on opposing natural enamel',
      'Ideal for heavy occlusion and grinders'
    ],
    related: ['zirconia-crowns', 'porcelain-fused-to-zirconia', 'pfm-crowns'],
    svgId: 'svg-z'
  },
  'acrylic-denture': {
    id: 'acrylic-denture',
    cat: 'Appliances',
    name: 'Acrylic Denture',
    tagline: 'Easy to alter, <em>moldable full dentures.</em>',
    lead: 'Acrylic Is One Of The Many Types Of Material That Can Be Used In The Creation Of Dentures. This Material Is A Great Option For Dentures As It Is Easy To Alter And Has The Ability To Mold And Adapt To The Changes Of The Mouth Over Time.',
    specs: [
      { label: 'Turnaround', value: '5–7 Business Days' },
      { label: 'Material', value: 'Premium Acrylic Resin' },
      { label: 'Arch', value: 'Upper or Lower' }
    ],
    features: [
      'Highly customizable and easy to alter',
      'Adapts to changes of the mouth over time',
      'Natural aesthetic and lightweight'
    ],
    related: ['acrylic-partial', 'flexible-partials', 'partial-metal-framework'],
    svgId: 'svg-n'
  },
  'acrylic-partial': {
    id: 'acrylic-partial',
    cat: 'Appliances',
    name: 'Acrylic Partial',
    tagline: 'Dependable and cheap, <em>comfortable fit.</em>',
    lead: 'Acrylic partial dentures are a cheap and dependable option for patients who need to replace missing teeth. These partials are composed of durable acrylic resin and are intended to fit pleasantly and securely in the mouth. The acrylic material looks natural and the denture’s design offers a comfortable fit. Acrylic partials are a wonderful choice for people seeking a low-cost and practical partial denture solution.',
    specs: [
      { label: 'Turnaround', value: '5 Business Days' },
      { label: 'Material', value: 'Durable Acrylic Resin' }
    ],
    features: [
      'Low-cost and practical partial solution',
      'Dependable and secure fit',
      'Natural pink aesthetics'
    ],
    related: ['acrylic-denture', 'flexible-partials', 'partial-metal-framework'],
    svgId: 'svg-n'
  },
  'partial-metal-framework': {
    id: 'partial-metal-framework',
    cat: 'Appliances',
    name: 'Partial Metal Framework',
    tagline: 'Solid alloy base, <em>maximum support.</em>',
    lead: 'Partial metal frameworks give a solid base for detachable partial dentures. These frameworks, made from high-quality metal alloys, are intended to securely keep the denture in place, assuring durability and comfort. The metal framework is carefully molded to fit the patient’s mouth while providing stability and support for the partial denture. This design provides an aesthetically acceptable and long-term option for people who require a partial denture.',
    specs: [
      { label: 'Turnaround', value: '7 Business Days' },
      { label: 'Material', value: 'Chrome-Cobalt Alloy' }
    ],
    features: [
      'Secure hold and extreme durability',
      'Carefully molded to the patient’s mouth',
      'Provides excellent stability and support'
    ],
    related: ['acrylic-partial', 'acrylic-denture', 'millable-flexible-partials'],
    svgId: 'svg-n'
  },
  'temporaries': {
    id: 'temporaries',
    cat: 'Crown & Bridge',
    name: 'Temporaries',
    tagline: 'Immediate functional <em>acrylic restorations.</em>',
    lead: 'Temporary restorations are an important element of the dental treatment process, providing patients with a functional and aesthetically acceptable alternative while they wait for their final restoration. Temporary crowns, bridges, and dentures are made of acrylic or resin and are intended to look and function similarly to natural teeth. These restorations are quick to make and give patients comfort and confidence during the interim time.',
    specs: [
      { label: 'Turnaround', value: '2–3 Business Days' },
      { label: 'Material', value: 'Premium Acrylic / PMMA' }
    ],
    features: [
      'Functional and aesthetic interim solution',
      'Quick to fabricate and customize',
      'Protects prepped teeth and maintains space'
    ],
    related: ['temporary-bridge', 'wax-up', 'zirconia-crowns'],
    svgId: 'svg-p'
  },
  'screw-retained-zirconia-bridge': {
    id: 'screw-retained-zirconia-bridge',
    cat: 'Implant Solutions',
    name: 'Screw Retained Zirconia Bridge',
    tagline: 'Cosmetic appeal, <em>durable full-arch restoration.</em>',
    lead: 'A screw-retained zirconia bridge combines strength and cosmetic appeal, making it an excellent alternative for full arch implant restorations. Zirconia’s exceptional durability and natural appearance ensure that the restoration looks and functions like real teeth. The screw-retained construction enables for simple modifications and retrieval, which is advantageous for both patients and dental professionals. This restoration is appropriate for patients seeking a permanent, long-lasting solution with a natural appearance.',
    specs: [
      { label: 'Turnaround', value: '8–10 Business Days' },
      { label: 'Material', value: 'Full Zirconia + Titanium Base' },
      { label: 'Arch', value: 'Full Arch' }
    ],
    features: [
      'Exceptional durability and lifelike aesthetics',
      'Screw-retained construction for retrievability',
      'Milled using precise CAD/CAM workflow'
    ],
    related: ['screw-retained-pmma-bridge', 'zirconia-hybrid', 'all-on-x-hybrids'],
    svgId: 'svg-a'
  },
  'screw-retained-pmma-bridge': {
    id: 'screw-retained-pmma-bridge',
    cat: 'Implant Solutions',
    name: 'Screw Retained PMMA Bridge',
    tagline: 'Stain resistant, <em>flexible full-arch bridge.</em>',
    lead: 'Screw-retained PMMA (Polymethyl Methacrylate) bridges are a wonderful option for individuals who need full-arch implant restorations. PMMA is a long-lasting, aesthetically pleasing material with high strength and flexibility. The screw-retained mechanism guarantees that the bridge is secured while also allowing for easy removal and adjustment as needed. These bridges are very effective for temporary repairs or when a permanent solution is required. The material is extremely resistant to wear and stains, assuring long-term durability.',
    specs: [
      { label: 'Turnaround', value: '5–7 Business Days' },
      { label: 'Material', value: 'High-Density PMMA' }
    ],
    features: [
      'Ideal for temporary full-arch restorations',
      'Highly resistant to wear and stains',
      'Flexible and comfortable fit'
    ],
    related: ['screw-retained-zirconia-bridge', 'zirconia-hybrid', 'all-on-x-hybrids'],
    svgId: 'svg-a'
  },
  'process-implant-acrylic-denture': {
    id: 'process-implant-acrylic-denture',
    cat: 'Implant Solutions',
    name: 'Process Implant Acrylic Denture',
    tagline: 'Stable and comfortable, <em>implant-supported.</em>',
    lead: 'Acrylic dentures made for implant restorations provide a long-lasting, cost-effective solution for individuals who require new teeth. These dentures are made of high-quality acrylic material, enabling a custom fit for each patient. The Process Implant Acrylic Denture is ideal for persons who have implant-supported restorations because it provides a stable and pleasant option that can be easily adjusted and improved over time. The acrylic material is both lightweight and aesthetically pleasant, making it a convenient and appealing solution for patients.',
    specs: [
      { label: 'Turnaround', value: '5–7 Business Days' },
      { label: 'Material', value: 'Premium Acrylic + Implant Attachments' }
    ],
    features: [
      'Stable and comfortable implant support',
      'Easily adjusted and improved over time',
      'Lightweight and highly aesthetic'
    ],
    related: ['acrylic-denture', 'screw-retained-bridge', 'all-on-x-hybrids'],
    svgId: 'svg-a'
  },
  'porcelain-fused-to-zirconia': {
    id: 'porcelain-fused-to-zirconia',
    cat: 'Ceramics',
    name: 'Porcelain Fused to Zirconia',
    tagline: 'Natural translucency, <em>high-strength PFZ.</em>',
    lead: 'Porcelain Fused to Zirconia (PFZ) restorations combine the durability of zirconia with the aesthetics of porcelain. The zirconia substructure is extremely durable and strong, while the porcelain coating replicates the natural translucency and appearance of teeth. This makes PFZ crowns, bridges, and restorations perfect for patients seeking a durable and aesthetically pleasing dental treatment. The material is appropriate for both anterior and posterior restorations, providing the best of both worlds in terms of strength and appearance.',
    specs: [
      { label: 'Turnaround', value: '5 Business Days' },
      { label: 'Material', value: 'Zirconia Core + Feldspathic Porcelain' }
    ],
    features: [
      'Natural translucency and appearance',
      'Extremely strong zirconia core',
      'Suitable for both anterior and posterior cases'
    ],
    related: ['full-contour-zirconia', 'zirconia-crowns', 'e-max-restorations'],
    svgId: 'svg-e'
  },
  'millable-flexible-partials': {
    id: 'millable-flexible-partials',
    cat: 'Appliances',
    name: 'Millable Flexible Partials',
    tagline: 'Novel dental solution, <em>lightweight flexibility.</em>',
    lead: 'Millable flexible partials are a novel dental solution that combines the advantages of flexibility and durability. These partial dentures are made from a highly flexible material that provides both comfort and a natural fit. Due to the lightweight nature of the flexible material, these partials are an excellent choice for individuals who desire a partial denture that blends in. The material is also highly fracture resistant, ensuring long-term durability, and the flexible design provides a more comfortable and less obtrusive fit.',
    specs: [
      { label: 'Turnaround', value: '5 Business Days' },
      { label: 'Material', value: 'High-Grade Flexible Thermoplastic' }
    ],
    features: [
      'Combines flexibility and durability',
      'Highly fracture resistant',
      'Comfortable and less obtrusive fit'
    ],
    related: ['flexible-partials', 'acrylic-partial', 'partial-metal-framework'],
    svgId: 'svg-n'
  },
  'screwmentable-crown-abutment-with-screw-channel-crown': {
    id: 'screwmentable-crown-abutment-with-screw-channel-crown',
    cat: 'Implant Solutions',
    name: 'Screwmentable Crown Abutment with Screw Channel Crown',
    tagline: 'Titanium abutment, <em>retrievable channel crown.</em>',
    lead: 'The Screw-Mentable Crown, which combines a titanium abutment and a screw channel crown, is a very successful alternative for implant restorations. This ingenious design provides a secure fit while still allowing for easy retrieval for changes or repairs. The titanium abutment provides a sturdy base, while the screw channel crown allows for flexibility and easy access. This restoration is ideal for patients who want a long-lasting, aesthetically pleasing option that is easy to maintain.',
    specs: [
      { label: 'Turnaround', value: '5–7 Business Days' },
      { label: 'Material', value: 'Titanium Abutment + Ceramic Crown' }
    ],
    features: [
      'Secure fit with titanium foundation',
      'Screw channel allows easy access and retrievability',
      'Ideal for maintenance and repairs'
    ],
    related: ['zirconia-screw-retained-crown-with-ti-base', 'screwmentable', 'titanium-custom-abutments'],
    svgId: 'svg-a'
  },
  'zirconia-screw-retained-crown-with-ti-base': {
    id: 'zirconia-screw-retained-crown-with-ti-base',
    cat: 'Implant Solutions',
    name: 'Zirconia Screw Retained Crown With TI Base',
    tagline: 'Zirconia crown on <em>titanium base interface.</em>',
    lead: 'This product combines zirconia’s strength and aesthetic appeal with the ease of a screw-retained construction. The zirconia crown is set on a titanium (TI) base, which provides a secure and stable fit for implant-supported restorations. The screw-retained mechanism enables for quick retrieval and adjustment as needed, giving patients and dental practitioners greater flexibility. This design is perfect for individuals who need a long-lasting, visually beautiful repair that is simple to maintain.',
    specs: [
      { label: 'Turnaround', value: '5 Business Days' },
      { label: 'Material', value: 'Monolithic Zirconia + Ti-Base' }
    ],
    features: [
      'Combines zirconia aesthetics with titanium strength',
      'Quick retrieval and adjustment',
      'Perfect fit with precision titanium base'
    ],
    related: ['screwmentable-crown-abutment-with-screw-channel-crown', 'titanium-custom-abutments', 'zirconia-crowns'],
    svgId: 'svg-a'
  },
  'flexible-partials': {
    id: 'flexible-partials',
    cat: 'Appliances',
    name: 'Flexible Partials',
    tagline: 'No metal clasps, <em>softer flexible dentures.</em>',
    lead: 'Flexible Partials are a removable prosthetic designed to fit the shape of your mouth and replace one or more missing teeth. This softer material allows this type of partial denture to flex and bend to fit the shape of your mouth. They do not require metal clasps to stay in place, which provides more comfortability and is more aesthetic.',
    specs: [
      { label: 'Turnaround', value: '5 Business Days' },
      { label: 'Material', value: 'Flexible Thermoplastic Resin' }
    ],
    features: [
      'Flexes and bends to fit shape of mouth',
      'No metal clasps required',
      'Highly aesthetic and comfortable'
    ],
    related: ['millable-flexible-partials', 'acrylic-partial', 'acrylic-denture'],
    svgId: 'svg-n'
  },
  'zirconia-hybrid': {
    id: 'zirconia-hybrid',
    cat: 'Implant Solutions',
    name: 'Zirconia Hybrid',
    tagline: 'Robust alternative, <em>full arch hybrid.</em>',
    lead: 'The Zirconia Hybrid combines zirconia’s powerful strength with acrylic’s attractive properties. This adaptable material provides a long-term, robust alternative for entire arch restorations. The Zirconia Hybrid is ideal for patients who require implant-supported crowns or bridges because of its natural appearance and feel, as well as its strength, which ensures stability over time. The material’s flexibility enables for precise customization to meet unique patient needs, making it a popular choice among dental experts.',
    specs: [
      { label: 'Turnaround', value: '8–10 Business Days' },
      { label: 'Material', value: 'Zirconia + Premium Acrylic' }
    ],
    features: [
      'Robust alternative for full-arch restorations',
      'Natural appearance and look',
      'Precise customization to meet unique needs'
    ],
    related: ['screw-retained-zirconia-bridge', 'screw-retained-pmma-bridge', 'all-on-x-hybrids'],
    svgId: 'svg-a'
  },
  'screw-retained-bridge': {
    id: 'screw-retained-bridge',
    cat: 'Implant Solutions',
    name: 'Screw Retained Bridge',
    tagline: 'Secure connection, <em>stable implant bridge.</em>',
    lead: 'A screw retained bridge essentially provides a secure and stable connection to the jawbone.',
    specs: [
      { label: 'Turnaround', value: '7–10 Business Days' },
      { label: 'Material', value: 'High-Noble Alloy / Ceramic / Zirconia' }
    ],
    features: [
      'Secure and stable connection to jawbone',
      'Retrievable screw-retained design',
      'CAD/CAM designed and milled'
    ],
    related: ['screw-retained-zirconia-bridge', 'process-implant-acrylic-denture', 'all-on-x-hybrids'],
    svgId: 'svg-a'
  },
  'temporary-bridge': {
    id: 'temporary-bridge',
    cat: 'Crown & Bridge',
    name: 'Temporary Bridge',
    tagline: 'Interim protection, <em>matched tooth shade.</em>',
    lead: 'A temporary bridge is a short-term solution used to fill the gap left by a missing tooth while a permanent bridge is fabricated. It is important, as it protects the gums and surrounding teeth during the healing process while maintaining space and function. Its usually made from acrylic or composite resin and designed to match the patients natural tooth color and shape.',
    specs: [
      { label: 'Turnaround', value: '2–3 Business Days' },
      { label: 'Material', value: 'Acrylic / Composite Resin' }
    ],
    features: [
      'Protects gums and teeth during healing',
      'Maintains space and natural function',
      'Matched to patient\'s natural tooth color and shape'
    ],
    related: ['temporaries', 'wax-up', 'zirconia-crowns'],
    svgId: 'svg-p'
  },
  'screwmentable': {
    id: 'screwmentable',
    cat: 'Implant Solutions',
    name: 'Screwmentable',
    tagline: 'Customized design, <em>screw-retained abutment.</em>',
    lead: 'A screwmentable crown is a screw-retained crown made on a custom abutment. Although many benefits are similar to a normal screw-retained crowns, it’s the customized design that sets them apart.',
    specs: [
      { label: 'Turnaround', value: '5–7 Business Days' },
      { label: 'Material', value: 'Titanium Abutment + Milled Zirconia/Ceramic' }
    ],
    features: [
      'Customized design sets it apart',
      'Combines benefits of cement and screw retention',
      'Precision-fit with custom-milled abutment'
    ],
    related: ['screwmentable-crown-abutment-with-screw-channel-crown', 'titanium-custom-abutments', 'zirconia-screw-retained-crown-with-ti-base'],
    svgId: 'svg-a'
  }
};

