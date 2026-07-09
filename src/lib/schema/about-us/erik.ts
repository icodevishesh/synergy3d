export const erik={
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": "https://synergy3d.net/about-us/erik#webpage",
      "url": "https://synergy3d.net/about-us/erik",
      "name": "Erik Morales — Synergy 3D",
      "isPartOf": { "@id": "https://synergy3d.net/#website" },
      "mainEntity": { "@id": "https://synergy3d.net/about-us/erik#person" },
      "breadcrumb": { "@id": "https://synergy3d.net/about-us/erik#breadcrumb" },
      "inLanguage": "en-US"
    },
    {
      "@type": "Person",
      "@id": "https://synergy3d.net/about-us/erik#person",
      "name": "Erik Morales",
      "givenName": "Erik",
      "familyName": "Morales",
      "jobTitle": "VP of Removable Prosthetics",
      "description": "Erik Morales leads Synergy 3D's removable prosthetics division, with specialized expertise in full and partial dentures, flexible prosthetics, and precision-milled removable appliances.",
      "image": "https://synergy3d.net/_next/static/media/Erik-Morales-VP-of-Removable-Prosthetics-scaled.26lquq8xofe1r.jpg",
      "url": "https://synergy3d.net/about-us/erik",
      "worksFor": { "@id": "https://synergy3d.net/#organization" },
      "knowsAbout": [
        "Removable Prosthetics",
        "Digital Dentures",
        "Partial Denture Design",
        "Occlusion",
        "Flexible Materials"
      ],
      "workLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Wappingers Falls",
          "addressRegion": "NY",
          "addressCountry": "US"
        }
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://synergy3d.net/about-us/erik#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://synergy3d.net/" },
        { "@type": "ListItem", "position": 2, "name": "About Us", "item": "https://synergy3d.net/about-us" },
        { "@type": "ListItem", "position": 3, "name": "Erik Morales", "item": "https://synergy3d.net/about-us/erik" }
      ]
    }
  ]
}
