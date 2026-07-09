export const screwmentableCrown={
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      "@id": "https://synergy3d.net/products/screwmentable#product",
      "name": "Screwmentable",
      "category": "Implant Solutions",
      "image": "https://synergy3d.net/_next/static/media/synergy3d_logo-new.22tr8ajfzh_x4.png",
      "url": "https://synergy3d.net/products/screwmentable",
      "brand": { "@type": "Brand", "name": "Synergy 3D" },
      "manufacturer": { "@id": "https://synergy3d.net/#organization" }
    },
    {
      "@type": "WebPage",
      "@id": "https://synergy3d.net/products/screwmentable#webpage",
      "url": "https://synergy3d.net/products/screwmentable",
      "name": "Screwmentable — Synergy 3D",
      "isPartOf": { "@id": "https://synergy3d.net/#website" },
      "mainEntity": { "@id": "https://synergy3d.net/products/screwmentable#product" },
      "breadcrumb": { "@id": "https://synergy3d.net/products/screwmentable#breadcrumb" },
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://synergy3d.net/products/screwmentable#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://synergy3d.net/" },
        { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://synergy3d.net/products" },
        { "@type": "ListItem", "position": 3, "name": "Screwmentable", "item": "https://synergy3d.net/products/screwmentable" }
      ]
    }
  ]
}