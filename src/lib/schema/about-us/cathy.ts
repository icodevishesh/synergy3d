export const cathy = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": "https://synergy3d.net/about-us/cathy#webpage",
      "url": "https://synergy3d.net/about-us/cathy",
      "name": "Cathy Romano — Synergy 3D",
      "isPartOf": { "@id": "https://synergy3d.net/#website" },
      "mainEntity": { "@id": "https://synergy3d.net/about-us/cathy#person" },
      "breadcrumb": { "@id": "https://synergy3d.net/about-us/cathy#breadcrumb" },
      "inLanguage": "en-US"
    },
    {
      "@type": "Person",
      "@id": "https://synergy3d.net/about-us/cathy#person",
      "name": "Cathy Romano",
      "givenName": "Cathy",
      "familyName": "Romano",
      "jobTitle": "Chief Financial Officer",
      "description": "With 37 years of experience directing financial advisors and 10 years as a corporate auditor with a Fortune 500 company, Cathy Romano brings extensive financial expertise, strategic insight, and strong financial oversight to Synergy 3D as CFO.",
      "image": "https://synergy3d.net/_next/static/media/Cathy-Romano-CFO-scaled.jpg",
      "url": "https://synergy3d.net/about-us/cathy",
      "worksFor": { "@id": "https://synergy3d.net/#organization" },
      "knowsAbout": [
        "Financial Strategy",
        "Corporate Auditing",
        "Operational Efficiency",
        "Revenue Growth",
        "Strategic Planning"
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
      "@id": "https://synergy3d.net/about-us/cathy#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://synergy3d.net/" },
        { "@type": "ListItem", "position": 2, "name": "About Us", "item": "https://synergy3d.net/about-us" },
        { "@type": "ListItem", "position": 3, "name": "Cathy Romano", "item": "https://synergy3d.net/about-us/cathy" }
      ]
    }
  ]
};
