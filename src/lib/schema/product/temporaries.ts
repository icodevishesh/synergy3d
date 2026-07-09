export const temporaries={
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      "@id": "https://synergy3d.net/products/temporaries#product",
      "name": "Temporaries",
      "category": "Crown & Bridge",
      "description": "Temporary restorations provide patients with a functional and aesthetically acceptable option while they wait for their final restoration. Made of acrylic or resin, temporary crowns, bridges, and dentures look and function similarly to natural teeth.",
      "image": "https://synergy3d.net/wp-content/uploads/2025/01/Temporaries-poster.png",
      "url": "https://synergy3d.net/products/temporaries",
      "material": "Acrylic / resin",
      "brand": { "@type": "Brand", "name": "Synergy 3D" },
      "manufacturer": { "@id": "https://synergy3d.net/#organization" }
    },
    {
      "@type": "WebPage",
      "@id": "https://synergy3d.net/products/temporaries#webpage",
      "url": "https://synergy3d.net/products/temporaries",
      "name": "Temporaries — Synergy 3D",
      "isPartOf": { "@id": "https://synergy3d.net/#website" },
      "primaryImageOfPage": "https://synergy3d.net/wp-content/uploads/2025/01/Temporaries-poster.png",
      "mainEntity": { "@id": "https://synergy3d.net/products/temporaries#product" },
      "breadcrumb": { "@id": "https://synergy3d.net/products/temporaries#breadcrumb" },
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://synergy3d.net/products/temporaries#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://synergy3d.net/" },
        { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://synergy3d.net/products" },
        { "@type": "ListItem", "position": 3, "name": "Temporaries", "item": "https://synergy3d.net/products/temporaries" }
      ]
    }
  ]
}