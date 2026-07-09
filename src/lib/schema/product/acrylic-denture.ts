export const acrylicDenture={
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      "@id": "https://synergy3d.net/products/acrylic-denture#product",
      "name": "Acrylic Denture",
      "category": "Removable Prosthetics",
      "description": "Acrylic is one of the many materials used in the creation of dentures. It is a great option as it is easy to alter and has the ability to mold and adapt to the changes of the mouth over time.",
      "image": "https://synergy3d.net/wp-content/uploads/2025/01/new-acrylic-denture-poster.png",
      "url": "https://synergy3d.net/products/acrylic-denture",
      "material": "Acrylic resin",
      "brand": { "@type": "Brand", "name": "Synergy 3D" },
      "manufacturer": { "@id": "https://synergy3d.net/#organization" }
    },
    {
      "@type": "WebPage",
      "@id": "https://synergy3d.net/products/acrylic-denture#webpage",
      "url": "https://synergy3d.net/products/acrylic-denture",
      "name": "Acrylic Denture — Synergy 3D",
      "isPartOf": { "@id": "https://synergy3d.net/#website" },
      "primaryImageOfPage": "https://synergy3d.net/wp-content/uploads/2025/01/new-acrylic-denture-poster.png",
      "mainEntity": { "@id": "https://synergy3d.net/products/acrylic-denture#product" },
      "breadcrumb": { "@id": "https://synergy3d.net/products/acrylic-denture#breadcrumb" },
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://synergy3d.net/products/acrylic-denture#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://synergy3d.net/" },
        { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://synergy3d.net/products" },
        { "@type": "ListItem", "position": 3, "name": "Acrylic Denture", "item": "https://synergy3d.net/products/acrylic-denture" }
      ]
    }
  ]
}