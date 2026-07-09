export const talks ={
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://synergy3d.net/talks#webpage",
      "url": "https://synergy3d.net/talks",
      "name": "SynergyTalks — Synergy 3D",
      "description": "Short and long-form conversations with dentists, lab technicians, and industry leaders exploring the future of digital dentistry.",
      "isPartOf": { "@id": "https://synergy3d.net/#website" },
      "about": { "@id": "https://synergy3d.net/#organization" },
      "inLanguage": "en-US",
      "breadcrumb": { "@id": "https://synergy3d.net/talks#breadcrumb" },
      "mainEntity": {
        "@type": "VideoObjectSeries",
        "name": "SynergyTalks",
        "url": "https://www.youtube.com/@Synergy_Talks",
        "publisher": { "@id": "https://synergy3d.net/#organization" }
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://synergy3d.net/talks#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://synergy3d.net/" },
        { "@type": "ListItem", "position": 2, "name": "SynergyTalks", "item": "https://synergy3d.net/talks" }
      ]
    }
  ]
}