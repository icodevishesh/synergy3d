export const bill = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": "https://synergy3d.net/about-us/bill#webpage",
      "url": "https://synergy3d.net/about-us/bill",
      "name": "Bill Hodges — Synergy 3D",
      "isPartOf": { "@id": "https://synergy3d.net/#website" },
      "mainEntity": { "@id": "https://synergy3d.net/about-us/bill#person" },
      "breadcrumb": { "@id": "https://synergy3d.net/about-us/bill#breadcrumb" },
      "inLanguage": "en-US"
    },
    {
      "@type": "Person",
      "@id": "https://synergy3d.net/about-us/bill#person",
      "name": "Bill Hodges",
      "givenName": "Bill",
      "familyName": "Hodges",
      "jobTitle": "National Sales Director",
      "description": "Bill Hodges serves as the National Sales Director at Synergy 3D, leading nationwide business development and expanding strategic partnerships with dental practices across the country.",
      "image": "https://synergy3d.net/_next/static/media/Bill-Hodges-National-Sales-Director-scaled.jpg",
      "url": "https://synergy3d.net/about-us/bill",
      "worksFor": { "@id": "https://synergy3d.net/#organization" },
      "knowsAbout": [
        "National Sales Strategy",
        "Practice Growth Consulting",
        "Client Relationship Management",
        "DSO Partnerships",
        "Sales Leadership"
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
      "@id": "https://synergy3d.net/about-us/bill#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://synergy3d.net/" },
        { "@type": "ListItem", "position": 2, "name": "About Us", "item": "https://synergy3d.net/about-us" },
        { "@type": "ListItem", "position": 3, "name": "Bill Hodges", "item": "https://synergy3d.net/about-us/bill" }
      ]
    }
  ]
};
