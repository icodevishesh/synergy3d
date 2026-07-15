import { Metadata } from 'next';

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
}

export const SEO_METADATA: Record<string, SEOData> = {
  '/': {
    title: "Best Digital Dental Lab in New York USA | Synergy 3D",
    description: "Synergy 3D is New York's premier digital dental lab delivering CAD/CAM crowns, implant restorations & prosthetics in 5 days. Send your digital scan today.",
    keywords: ["digital dental lab","dental laboratory","dental lab in New York","CAD/CAM dental lab","dental restorations","best dental lab in USA"]
  },
  '/lab-services': {
    title: "Dental Lab Services & Products | Full Dental Services in USA",
    description: "Explore Synergy 3D's full dental lab services: zirconia crowns, implant restorations, dentures, guards & more. Milled in-house in New York. Explore now.",
    keywords: ["dental lab services","dental lab products","dental restorations","crown and bridge dental lab","removable dental prosthetics","full service dental lab"]
  },
  '/lab-services/products/zirconia-crowns': {
    title: "Zirconia Crowns Dental Lab | full contour zirconia | Synergy 3D",
    description: "Order high-strength, natural-looking zirconia crowns from Synergy 3D's digital dental lab. Sub-30µm fit accuracy, milled in-house, shipped in 5 days.",
    keywords: ["zirconia crown dental lab","full contour zirconia","zirconia dental lab","dental crown lab","CAD/CAM crowns","high-strength zirconia crowns"]
  },
  '/lab-services/products/all-on-x-hybrids': {
    title: "All-on-X Hybrids | Full Arch Restorations Lab | Synergy 3D",
    description: "Full-arch All-on-X hybrid restorations from a trusted implant dental lab. All-on-4, All-on-6 & custom frameworks milled in-house. Request a quote today.",
    keywords: ["full arch restorations dental lab","All-on-X hybrids","All-on-4 lab","implant restorations dental lab","hybrid prosthesis","implant dental laboratory"]
  },
  '/lab-services/products/e-max-restorations': {
    title: "e.max Crowns & Restorations Dental Lab | Synergy 3D Lab",
    description: "Premium e.max lithium disilicate crowns, veneers & onlays from Synergy 3D's ceramic dental lab. Unmatched aesthetics, precise fit, 5-day delivery.",
    keywords: ["e.max crowns dental lab","emax crown","e max dental crown","lithium disilicate restorations","ceramic dental lab","anterior aesthetics"]
  },
  '/lab-services/products/pfm-crowns': {
    title: "Porcelain Fused to Metal (PFM) Crowns Lab | Synergy 3D",
    description: "Durable porcelain-fused-to-metal crowns & PFM bridges from Synergy 3D dental lab. Proven strength with excellent aesthetics. Send your case today.",
    keywords: ["porcelain fused to metal crowns","PFM crowns dental lab","PFM bridge","crown and bridge dental lab","dental crown laboratory","durable restorations"]
  },
  '/lab-services/products/surgical-guides': {
    title: "Dental Surgical Guides Lab | CBCT-Planned | Synergy 3D",
    description: "CBCT-based, digitally planned surgical guides for precise implant placement. Partner with Synergy 3D's implant surgical guide lab. Upload your scan now.",
    keywords: ["dental surgical guide","implant surgical guide lab","surgical guides dental lab","CBCT guided surgery","implant placement guides","digital implant planning"]
  },
  '/lab-services/products/night-guards': {
    title: "Custom Night Guards Dental Lab | Milled Splints | Synergy 3D",
    description: "Custom-milled night guards & occlusal splints for bruxism and TMJ protection from Synergy 3D's digital dental lab. Precise fit, fast turnaround. Order now.",
    keywords: ["custom night guard","dental lab night guard","occlusal splints","bruxism guards","TMJ appliances","milled night guards"]
  },
  '/lab-services/products/printed-models-dies': {
    title: "3D Printed Dental Models & Dies | Precision | Synergy 3D",
    description: "High-accuracy 3D printed dental models & dies for planning, verification and case communication. Printed in-house at Synergy 3D's New York digital lab.",
    keywords: ["3D printed dental models","printed models and dies","dental 3d printer models","study models","digital dental lab","dies for crown and bridge"]
  },
  '/talks': {
    title: "SynergyTalks: Digital Dentistry Videos for Dentists",
    description: "Watch SynergyTalks — short & long-form videos on digital dentistry, lab workflows and restorative tips for dentists, from the Synergy 3D team. Watch now.",
    keywords: ["digital dentistry videos","SynergyTalks","dental lab education","digital dental workflow","clinical tips for dentists","dental technology videos"]
  },
  '/education': {
    title: "Digital Dentistry Training & Education | Synergy 3D Lab",
    description: "Hands-on digital dentistry training and education for dentists. Learn scanning, digital workflows & restorative protocols with Synergy 3D. Start learning.",
    keywords: ["digital dentistry training for dentists","dental lab education","digital workflow training","hands-on dental courses","CE resources for dentists","restorative dentistry learning"]
  },
  '/articles': {
    title: "Dental Lab Articles & Digital Dentistry Tips | Synergy 3D",
    description: "Read expert articles from the Synergy 3D bench — digital dentistry insights, material science, workflow tips & restorative guidance for dental teams.",
    keywords: ["dental lab articles","digital dentistry insights","restorative dentistry articles","dental lab blog","CAD/CAM tips","insights from the bench"]
  },
  '/webinars': {
    title: "Dental Webinars for Dentists | Live & On-Demand | Synergy 3D",
    description: "Join live and on-demand dental webinars from Synergy 3D. Digital workflows, implant restorations & lab protocols explained by experts. Register today.",
    keywords: ["dental webinars for dentists","digital dentistry webinars","live CE webinars","dental lab webinars","on-demand dental education","implant webinars"]
  },
  '/customer-stories': {
    title: "Customer Stories: Dentists on Synergy 3D Dental Lab",
    description: "See how 500+ partner practices use Synergy 3D's digital dental lab — real customer stories, case results and testimonials from dentists. Explore stories.",
    keywords: ["dental lab customer stories","best dental lab reviews","dentist testimonials","dental lab case studies","digital dental lab results","partner practices"]
  },
  '/about-us': {
    title: "About Synergy 3D | New York Digital Dental Laboratory",
    description: "Meet Synergy 3D — a New York digital dental laboratory with in-house milling, FDA-cleared materials & certified technicians serving all 50 states.",
    keywords: ["best dental lab in USA","digital dental laboratory","dental lab in New York","FDA-cleared materials","in-house milling","dental lab team"]
  },
  '/contact-details': {
    title: "Contact Synergy 3D Dental Lab | 7-Day Support Team",
    description: "Contact Synergy 3D's New York dental lab. Talk to real technicians 7 days a week, request a call back or start your first digital case. Reach out today.",
    keywords: ["contact dental lab","dental lab support","request a call back","dental lab in New York","new dentist accounts","dental lab phone"]
  },
  '/digital-workflow': {
    title: "Scanner Compatible Dental Lab | iTero, 3Shape | Synergy 3D",
    description: "Synergy 3D accepts scans from iTero, 3Shape, Medit, Primescan & more. See how our digital dental workflow goes from scan upload to 5-day delivery.",
    keywords: ["scanner compatible dental lab","iTero dental lab","3Shape lab","digital impressions","intraoral scanner integrations","digital dental workflow"]
  },
  '/lab-services/products/zirconia-hybrid-custom-abutment': {
    title: "Zirconia Hybrid Custom Abutments | Dental Lab | Synergy 3D",
    description: "Order zirconia hybrid custom abutments for esthetic implant restorations. Precision-milled emergence profiles from Synergy 3D's lab. Request a quote.",
    keywords: ["zirconia hybrid custom abutment","custom zirconia abutment","hybrid abutments","implant restorations dental lab","custom abutments","esthetic abutments"]
  },
  '/lab-services/products/wax-up': {
    title: "Dental Wax-Up Services | Diagnostic & Digital | Synergy 3D",
    description: "Diagnostic and digital dental wax-ups for treatment planning, smile design & case acceptance. Crafted by Synergy 3D's lab technicians. Send your case.",
    keywords: ["dental wax up","diagnostic wax up","digital wax up","smile design lab","treatment planning wax up","dental lab wax up services"]
  },
  '/lab-services/products/titanium-custom-abutments': {
    title: "Titanium Custom Abutments | Implant Dental Lab | Synergy 3D",
    description: "CAD/CAM titanium custom abutments milled for ideal emergence and margin placement. Trusted implant dental lab quality from Synergy 3D. Order today.",
    keywords: ["titanium custom abutments","custom abutments","implant abutment lab","CAD/CAM abutments","implant restorations dental lab","ti custom abutments"]
  },
  '/lab-services/products/full-contour-zirconia': {
    title: "Full Contour Zirconia Crowns & Bridges | Synergy 3D Lab",
    description: "Monolithic full contour zirconia crowns and bridges built for strength and precision. Milled in-house at Synergy 3D's zirconia dental lab. Order now.",
    keywords: ["full contour zirconia","monolithic zirconia crowns","zirconia dental lab","full zirconia crown","crown and bridge dental lab","high strength zirconia"]
  },
  '/lab-services/products/acrylic-denture': {
    title: "Acrylic Dentures Lab | Full & Complete Dentures | Synergy 3D",
    description: "Quality acrylic dentures from Synergy 3D's denture laboratory. Natural esthetics, accurate fit & reliable turnaround for your removable cases. Order now.",
    keywords: ["acrylic denture","denture laboratory","dental labs for dentures","full dentures lab","removable dental prosthetics","digital dentures"]
  },
  '/lab-services/products/acrylic-partial': {
    title: "Acrylic Partial Dentures | Removable Dental Lab | Synergy 3D",
    description: "Order acrylic partial dentures from Synergy 3D's removable dental lab. Comfortable, well-fitting partials with dependable turnaround. Send your case.",
    keywords: ["acrylic partial denture","partial denture lab","removable dental lab","acrylic partials","dental labs for dentures","interim partials"]
  },
  '/lab-services/products/partial-metal-framework': {
    title: "Partial Metal Framework | Cast Partials Lab | Synergy 3D",
    description: "Precision partial metal frameworks and cast partial dentures engineered for strength, retention and comfort at Synergy 3D's lab. Request a quote today.",
    keywords: ["partial metal framework","cast partial dentures","metal framework partials","removable dental prosthetics","chrome cobalt partials","partial denture lab"]
  },
  '/lab-services/products/temporaries': {
    title: "Dental Temporaries Lab | Provisional Crowns | Synergy 3D",
    description: "Milled PMMA temporaries and provisional crowns & bridges with accurate fit and strong esthetics from Synergy 3D's digital dental lab. Order today.",
    keywords: ["dental temporaries lab","temporary crowns and bridges","provisional restorations","PMMA temporaries","interim crowns","digital dental lab"]
  },
  '/lab-services/products/screw-retained-zirconia-bridge': {
    title: "Screw Retained Zirconia Bridge | Implant Lab | Synergy 3D",
    description: "Full-arch screw retained zirconia bridges milled in-house for strength and passive fit. Implant lab precision from Synergy 3D. Request a quote today.",
    keywords: ["screw retained zirconia bridge","screw retained bridge","full arch zirconia","implant restorations dental lab","zirconia implant bridge","fixed hybrid bridge"]
  },
  '/lab-services/products/screw-retained-pmma-bridge': {
    title: "Screw Retained PMMA Bridge | Provisional Lab | Synergy 3D",
    description: "Order screw retained PMMA bridges for full-arch provisional implant cases. Strong, esthetic interim restorations from Synergy 3D's lab. Send your scan.",
    keywords: ["screw retained PMMA bridge","provisional implant bridge","PMMA full arch","temporary implant bridge","implant restorations dental lab","All-on-X provisional"]
  },
  '/lab-services/products/process-implant-acrylic-denture': {
    title: "Implant Acrylic Denture Processing | Lab | Synergy 3D",
    description: "Implant acrylic denture processing with accurate fit over your implant platform. Reliable removable work from Synergy 3D's denture lab. Order today.",
    keywords: ["implant acrylic denture","process implant denture","implant overdenture lab","removable dental prosthetics","denture laboratory","implant retained denture"]
  },
  '/lab-services/products/porcelain-fused-to-zirconia': {
    title: "Porcelain Fused to Zirconia (PFZ) Crowns | Synergy 3D Lab",
    description: "Porcelain fused to zirconia crowns combine layered esthetics with zirconia strength. Hand-finished by Synergy 3D's ceramic dental lab. Order today.",
    keywords: ["porcelain fused to zirconia","PFZ crowns","layered zirconia restorations","ceramic dental lab","zirconia crown dental lab","esthetic zirconia crowns"]
  },
  '/lab-services/products/millable-flexible-partials': {
    title: "Millable Flexible Partials | Digital Dentures | Synergy 3D",
    description: "Digitally milled flexible partials with superior fit, strength and esthetics over pressed options. From Synergy 3D's removable lab. Request a quote.",
    keywords: ["millable flexible partials","flexible partial dentures","milled flexible partials","removable dental lab","digital partial dentures","metal-free partials"]
  },
  '/lab-services/products/screwmentable-crown-abutment-with-screw-channel-crown': {
    title: "Screwmentable Crown & Abutment with Screw Channel | Synergy",
    description: "Screwmentable crown & abutment with screw channel — cement esthetics with screw retrievability. Precision implant work from Synergy 3D. Order today.",
    keywords: ["screwmentable crown","screwmentable crown and abutment","screw channel crown","implant crown lab","retrievable implant crowns","custom abutments"]
  },
  '/lab-services/products/zirconia-screw-retained-crown-with-ti-base': {
    title: "Zirconia Screw Retained Crown with Ti Base | Synergy 3D",
    description: "Zirconia screw retained crowns on Ti bases for strong, retrievable single-implant restorations. Milled in-house at Synergy 3D's lab. Send your scan.",
    keywords: ["zirconia screw retained crown","ti base implant crown","screw retained restorations","implant crown dental lab","zirconia implant crown","angulated screw channel"]
  },
  '/lab-services/products/flexible-partials': {
    title: "Flexible Partial Dentures Lab | Metal-Free | Synergy 3D",
    description: "Lightweight, metal-free flexible partial dentures with natural esthetics and comfortable fit from Synergy 3D's removable dental lab. Send your case.",
    keywords: ["flexible partial dentures","flexible partials lab","metal-free partials","removable dental lab","nylon partial dentures","comfortable partials"]
  },
  '/lab-services/products/zirconia-hybrid': {
    title: "Zirconia Hybrid Prosthesis | Full Arch Lab | Synergy 3D",
    description: "Full-arch zirconia hybrid prostheses engineered for strength, esthetics and passive fit. Trusted All-on-X work from Synergy 3D's lab. Request a quote.",
    keywords: ["zirconia hybrid prosthesis","zirconia hybrid","full arch zirconia hybrid","All-on-X zirconia","implant hybrid lab","fixed full arch restorations"]
  },
  '/lab-services/products/screw-retained-bridge': {
    title: "Screw Retained Bridge | Implant Bridge Lab | Synergy 3D",
    description: "Multi-unit screw retained bridges designed for passive fit and easy retrievability. Implant restoration expertise from Synergy 3D's lab. Order today.",
    keywords: ["screw retained bridge","screw retained restorations","implant bridge lab","multi-unit implant bridge","implant restorations dental lab","fixed implant bridge"]
  },
  '/lab-services/products/temporary-bridge': {
    title: "Temporary Dental Bridge | Provisional Lab | Synergy 3D",
    description: "Strong, esthetic temporary dental bridges milled from PMMA for reliable provisional coverage. Fast turnaround from Synergy 3D's lab. Send your case.",
    keywords: ["temporary bridge dental","provisional bridge lab","interim bridge","PMMA bridge","temporary crowns and bridges","digital dental lab"]
  },
  '/lab-services/products/screwmentable': {
    title: "Screwmentable Restorations | Implant Crown Lab | Synergy 3D",
    description: "Screwmentable restorations blend cement-retained esthetics with screw-retained retrievability. Implant crown precision from Synergy 3D. Order today.",
    keywords: ["screwmentable restoration","screwmentable crown","hybrid implant crown","retrievable implant restorations","implant crown lab","screw and cement retained"]
  },
  '/about-us/enrico': {
    title: "Enrico | Synergy 3D Digital Dental Lab Team, New York",
    description: "Meet Enrico of Synergy 3D, New York's digital dental laboratory. Learn how our team supports dentists with precision restorations. Get to know us.",
    keywords: ["Enrico Synergy 3D","dental lab team","digital dental lab New York","dental technicians","Synergy 3D leadership","meet the team"]
  },
  '/about-us/davie': {
    title: "Davie | Synergy 3D Digital Dental Lab Team, New York",
    description: "Meet Davie of the Synergy 3D team, delivering precision dental restorations from our New York digital lab to practices nationwide. Get to know us.",
    keywords: ["Davie Synergy 3D","dental lab team","dental technicians","digital dental lab New York","Synergy 3D staff","meet the team"]
  },
  '/about-us/gina': {
    title: "Gina | Synergy 3D Digital Dental Lab Team, New York",
    description: "Meet Gina of Synergy 3D, part of the New York digital dental lab team helping dentists deliver accurate, on-time restorations. Get to know our team.",
    keywords: ["Gina Synergy 3D","dental lab team","dental technicians","digital dental lab New York","Synergy 3D staff","meet the team"]
  },
  '/about-us/milos': {
    title: "Milos | Synergy 3D Digital Dental Lab Team, New York",
    description: "Meet Milos of Synergy 3D's New York digital dental laboratory — supporting dentists with expert craftsmanship on every case. Get to know our team.",
    keywords: ["Milos Synergy 3D","dental lab team","dental technicians","digital dental lab New York","Synergy 3D staff","meet the team"]
  },
  '/about-us/erik': {
    title: "Erik | Synergy 3D Digital Dental Lab Team, New York",
    description: "Meet Erik of the Synergy 3D team in New York, contributing to the digital workflows and lab precision dentists rely on daily. Get to know our team.",
    keywords: ["Erik Synergy 3D","dental lab team","dental technicians","digital dental lab New York","Synergy 3D staff","meet the team"]
  },
  '/about-us/ashley': {
    title: "Ashley | Synergy 3D Digital Dental Lab Team, New York",
    description: "Meet Ashley of Synergy 3D, helping dental practices nationwide with responsive support from our New York digital dental lab. Get to know our team.",
    keywords: ["Ashley Synergy 3D","dental lab team","dental technicians","digital dental lab New York","Synergy 3D staff","meet the team"]
  },
  '/about-us/kelli': {
    title: "Kelli | Synergy 3D Digital Dental Lab Team, New York",
    description: "Meet Kelli of Synergy 3D's New York team, ensuring smooth case management and dependable service for our partner dentists nationwide. Get to know our team.",
    keywords: ["Kelli Synergy 3D","dental lab team","dental technicians","digital dental lab New York","Synergy 3D staff","meet the team"]
  },
  '/apply': {
    title: "Careers at Synergy 3D | Dental Lab Jobs in New York",
    description: "Join Synergy 3D's growing digital dental lab in New York. Explore dental technician and lab career openings and apply online today. Start your journey.",
    keywords: ["dental lab careers","dental lab jobs New York","dental technician jobs","digital dental lab careers","join dental lab team","apply dental lab"]
  },
};

export function getMetadataForPath(path: string): Metadata {
  const data = SEO_METADATA[path];
  if (!data) return {};
  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
  };
}
