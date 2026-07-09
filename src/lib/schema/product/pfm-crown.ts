export const pfmCrownsSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      "@id": "https://synergy3d.net/products/pfm-crowns#product",
      "name": "PFM Crowns",
      "category": "Ceramics",
      "description": "Porcelain-fused-to-metal crowns remain a gold standard for posterior restorations requiring maximum strength. Our PFMs are fired over high-noble or semi-precious metal frameworks using premium feldspathic porcelain.",
      "image": "https://synergy3d.net/_next/static/media/pmf.029a8fej8ofwm.png",
      "url": "https://synergy3d.net/products/pfm-crowns",
      "material": "High-Noble / Semi-Precious metal with feldspathic porcelain",
      "brand": { "@type": "Brand", "name": "Synergy 3D" },
      "manufacturer": { "@id": "https://synergy3d.net/#organization" },
      "isRelatedTo": [
        { "@id": "https://synergy3d.net/products/zirconia-crowns#product" },
        { "@id": "https://synergy3d.net/products/e-max-restorations#product" },
        { "@id": "https://synergy3d.net/products/night-guards#product" }
      ],
      "additionalProperty": [
        { "@type": "PropertyValue", "name": "Turnaround", "value": "5 Business Days" },
        { "@type": "PropertyValue", "name": "Framework", "value": "High-Noble / Semi-Precious" },
        { "@type": "PropertyValue", "name": "Porcelain", "value": "Feldspathic" },
        { "@type": "PropertyValue", "name": "Shade System", "value": "VITA Classical" }
      ]
    },
    {
      "@type": "WebPage",
      "@id": "https://synergy3d.net/products/pfm-crowns#webpage",
      "url": "https://synergy3d.net/products/pfm-crowns",
      "name": "PFM Crowns — Synergy 3D",
      "isPartOf": { "@id": "https://synergy3d.net/#website" },
      "primaryImageOfPage": "https://synergy3d.net/_next/static/media/pmf.029a8fej8ofwm.png",
      "mainEntity": { "@id": "https://synergy3d.net/products/pfm-crowns#product" },
      "breadcrumb": { "@id": "https://synergy3d.net/products/pfm-crowns#breadcrumb" },
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://synergy3d.net/products/pfm-crowns#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://synergy3d.net/" },
        { "@type": "ListItem", "position": 2, "name": "Lab Services", "item": "https://synergy3d.net/products" },
        { "@type": "ListItem", "position": 3, "name": "PFM Crowns", "item": "https://synergy3d.net/products/pfm-crowns" }
      ]
    }
  ]
}