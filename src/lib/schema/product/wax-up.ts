export const waxUp={
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      "@id": "https://synergy3d.net/products/wax-up#product",
      "name": "Wax Up",
      "category": "Diagnostic & Planning",
      "description": "A wax-up is a preparatory model used in the planning phase of dental restoration. Made of wax or from a digital model, it allows the dentist to preview the final result before fabricating the actual restoration, ensuring the correct fit, form, and aesthetics of crowns, bridges, or dentures.",
      "image": "https://synergy3d.net/wp-content/uploads/2024/11/wax_up_poster.png",
      "url": "https://synergy3d.net/products/wax-up",
      "brand": { "@type": "Brand", "name": "Synergy 3D" },
      "manufacturer": { "@id": "https://synergy3d.net/#organization" }
    },
    {
      "@type": "WebPage",
      "@id": "https://synergy3d.net/products/wax-up#webpage",
      "url": "https://synergy3d.net/products/wax-up",
      "name": "Wax Up — Synergy 3D",
      "isPartOf": { "@id": "https://synergy3d.net/#website" },
      "primaryImageOfPage": "https://synergy3d.net/wp-content/uploads/2024/11/wax_up_poster.png",
      "mainEntity": { "@id": "https://synergy3d.net/products/wax-up#product" },
      "breadcrumb": { "@id": "https://synergy3d.net/products/wax-up#breadcrumb" },
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://synergy3d.net/products/wax-up#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://synergy3d.net/" },
        { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://synergy3d.net/products" },
        { "@type": "ListItem", "position": 3, "name": "Wax Up", "item": "https://synergy3d.net/products/wax-up" }
      ]
    }
  ]
}
