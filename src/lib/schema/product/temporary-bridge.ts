export const temporaryBridge = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      "@id": "https://synergy3d.net/products/temporary-bridge#product",
      "name": "Temporary Bridge",
      "category": "Crown & Bridge",
      "image": "https://synergy3d.net/_next/static/media/synergy3d_logo-new.22tr8ajfzh_x4.png",
      "url": "https://synergy3d.net/products/temporary-bridge",
      "brand": { "@type": "Brand", "name": "Synergy 3D" },
      "manufacturer": { "@id": "https://synergy3d.net/#organization" }
    },
    {
      "@type": "WebPage",
      "@id": "https://synergy3d.net/products/temporary-bridge#webpage",
      "url": "https://synergy3d.net/products/temporary-bridge",
      "name": "Temporary Bridge — Synergy 3D",
      "isPartOf": { "@id": "https://synergy3d.net/#website" },
      "mainEntity": { "@id": "https://synergy3d.net/products/temporary-bridge#product" },
      "breadcrumb": { "@id": "https://synergy3d.net/products/temporary-bridge#breadcrumb" },
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://synergy3d.net/products/temporary-bridge#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://synergy3d.net/" },
        { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://synergy3d.net/products" },
        { "@type": "ListItem", "position": 3, "name": "Temporary Bridge", "item": "https://synergy3d.net/products/temporary-bridge" }
      ]
    }
  ]
}