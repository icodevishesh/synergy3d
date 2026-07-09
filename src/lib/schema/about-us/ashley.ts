export const ashley={
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": "https://synergy3d.net/about-us/ashley#webpage",
      "url": "https://synergy3d.net/about-us/ashley",
      "name": "Ashley Lezon — Synergy 3D",
      "isPartOf": { "@id": "https://synergy3d.net/#website" },
      "mainEntity": { "@id": "https://synergy3d.net/about-us/ashley#person" },
      "breadcrumb": { "@id": "https://synergy3d.net/about-us/ashley#breadcrumb" },
      "inLanguage": "en-US"
    },
    {
      "@type": "Person",
      "@id": "https://synergy3d.net/about-us/ashley#person",
      "name": "Ashley Lezon",
      "givenName": "Ashley",
      "familyName": "Lezon",
      "jobTitle": "VP of Customer Integration",
      "description": "Ashley Lezon serves as VP of Customer Integration at Synergy 3D, the primary bridge between the lab and its network of dental practice partners, leading scanner training, digital workflow integration, and customer education.",
      "image": "https://synergy3d.net/_next/static/media/Ashley-Sgaramella-VP-of-Customer-Integration-scaled.34inubpdjh432.jpg",
      "url": "https://synergy3d.net/about-us/ashley",
      "worksFor": { "@id": "https://synergy3d.net/#organization" },
      "knowsAbout": [
        "Customer Success",
        "Practice Integration",
        "Scanner Training",
        "Workflow Consulting",
        "Relationship Management"
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
      "@id": "https://synergy3d.net/about-us/ashley#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://synergy3d.net/" },
        { "@type": "ListItem", "position": 2, "name": "About Us", "item": "https://synergy3d.net/about-us" },
        { "@type": "ListItem", "position": 3, "name": "Ashley Lezon", "item": "https://synergy3d.net/about-us/ashley" }
      ]
    }
  ]
}