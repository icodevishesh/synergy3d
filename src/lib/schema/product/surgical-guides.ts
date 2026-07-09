export const surgicalGuide = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      "@id": "https://synergy3d.net/products/surgical-guides#product",
      "name": "Surgical Guides",
      "category": "Implant Solutions",
      "description": "CBCT-based surgical guides planned using the latest implant planning software and 3D-printed in dental-grade resin. Fully guided, pilot-only, or open-guided options available for single, multiple, and full-arch cases.",
      "image": "https://synergy3d.net/_next/static/media/surgical-guides.1x08h261bttg9.png",
      "url": "https://synergy3d.net/products/surgical-guides",
      "material": "Surgical-grade biocompatible resin",
      "brand": { "@type": "Brand", "name": "Synergy 3D" },
      "manufacturer": { "@id": "https://synergy3d.net/#organization" },
      "isRelatedTo": [
        { "@id": "https://synergy3d.net/products/all-on-x-hybrids#product" },
        { "@id": "https://synergy3d.net/products/printed-models-dies#product" },
        { "@id": "https://synergy3d.net/products/zirconia-crowns#product" }
      ],
      "additionalProperty": [
        { "@type": "PropertyValue", "name": "Turnaround", "value": "3–5 Business Days" },
        { "@type": "PropertyValue", "name": "Planning", "value": "CBCT + IOS Required" },
        { "@type": "PropertyValue", "name": "Guide Type", "value": "Fully / Pilot / Open" },
        { "@type": "PropertyValue", "name": "Compatibility", "value": "All Major Systems" }
      ]
    },
    {
      "@type": "WebPage",
      "@id": "https://synergy3d.net/products/surgical-guides#webpage",
      "url": "https://synergy3d.net/products/surgical-guides",
      "name": "Surgical Guides — Synergy 3D",
      "isPartOf": { "@id": "https://synergy3d.net/#website" },
      "primaryImageOfPage": "https://synergy3d.net/_next/static/media/surgical-guides.1x08h261bttg9.png",
      "mainEntity": { "@id": "https://synergy3d.net/products/surgical-guides#product" },
      "breadcrumb": { "@id": "https://synergy3d.net/products/surgical-guides#breadcrumb" },
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://synergy3d.net/products/surgical-guides#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://synergy3d.net/" },
        { "@type": "ListItem", "position": 2, "name": "Lab Services", "item": "https://synergy3d.net/products" },
        { "@type": "ListItem", "position": 3, "name": "Surgical Guides", "item": "https://synergy3d.net/products/surgical-guides" }
      ]
    }
  ]
}