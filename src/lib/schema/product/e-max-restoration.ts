

export const eMaxRestorationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      "@id": "https://synergy3d.net/products/e-max-restorations#product",
      "name": "e.max Restorations",
      "category": "Ceramics",
      "description": "IPS e.max is the world's leading ceramic system, combining exceptional strength (400 MPa) with outstanding optical properties. Ideal for veneers, inlays, onlays, and anterior and posterior crowns requiring natural-looking translucency.",
      "image": "https://synergy3d.net/_next/static/media/emax-restoration.1ou2ua8dmwi0-.png",
      "url": "https://synergy3d.net/products/e-max-restorations",
      "material": "IPS e.max CAD (lithium disilicate)",
      "brand": { "@type": "Brand", "name": "Synergy 3D" },
      "manufacturer": { "@id": "https://synergy3d.net/#organization" },
      "isRelatedTo": [
        { "@id": "https://synergy3d.net/products/zirconia-crowns#product" },
        { "@id": "https://synergy3d.net/products/pfm-crowns#product" },
        { "@id": "https://synergy3d.net/products/all-on-x-hybrids#product" }
      ],
      "additionalProperty": [
        { "@type": "PropertyValue", "name": "Turnaround", "value": "5 Business Days" },
        { "@type": "PropertyValue", "name": "Material", "value": "IPS e.max CAD" },
        { "@type": "PropertyValue", "name": "Flexural Strength", "value": "≥ 400 MPa" },
        { "@type": "PropertyValue", "name": "Shade System", "value": "VITA / Bleach" }
      ]
    },
    {
      "@type": "WebPage",
      "@id": "https://synergy3d.net/products/e-max-restorations#webpage",
      "url": "https://synergy3d.net/products/e-max-restorations",
      "name": "e.max Restorations — Synergy 3D",
      "isPartOf": { "@id": "https://synergy3d.net/#website" },
      "primaryImageOfPage": "https://synergy3d.net/_next/static/media/emax-restoration.1ou2ua8dmwi0-.png",
      "mainEntity": { "@id": "https://synergy3d.net/products/e-max-restorations#product" },
      "breadcrumb": { "@id": "https://synergy3d.net/products/e-max-restorations#breadcrumb" },
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://synergy3d.net/products/e-max-restorations#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://synergy3d.net/" },
        { "@type": "ListItem", "position": 2, "name": "Lab Services", "item": "https://synergy3d.net/products" },
        { "@type": "ListItem", "position": 3, "name": "e.max Restorations", "item": "https://synergy3d.net/products/e-max-restorations" }
      ]
    }
  ]
}