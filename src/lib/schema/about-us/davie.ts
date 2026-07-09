export const davie={
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": "https://synergy3d.net/about-us/davie#webpage",
      "url": "https://synergy3d.net/about-us/davie",
      "name": "Davie Carino — Synergy 3D",
      "isPartOf": { "@id": "https://synergy3d.net/#website" },
      "mainEntity": { "@id": "https://synergy3d.net/about-us/davie#person" },
      "breadcrumb": { "@id": "https://synergy3d.net/about-us/davie#breadcrumb" },
      "inLanguage": "en-US"
    },
    {
      "@type": "Person",
      "@id": "https://synergy3d.net/about-us/davie#person",
      "name": "Davie Carino",
      "givenName": "Davie",
      "familyName": "Carino",
      "jobTitle": "Chief Operating Officer",
      "description": "Davie Carino serves as Chief Operating Officer at Synergy 3D, overseeing day-to-day operations, production workflows, and quality control systems, ensuring every restoration meets the lab's exacting standards.",
      "image": "https://synergy3d.net/_next/static/media/Davie-Carino-C.O.O-scaled.13f2cchgm8phg.jpg",
      "url": "https://synergy3d.net/about-us/davie",
      "worksFor": { "@id": "https://synergy3d.net/#organization" },
      "knowsAbout": [
        "Operations Management",
        "Production Workflow",
        "Quality Control",
        "Team Management",
        "Digital Dentistry"
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
      "@id": "https://synergy3d.net/about-us/davie#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://synergy3d.net/" },
        { "@type": "ListItem", "position": 2, "name": "About Us", "item": "https://synergy3d.net/about-us" },
        { "@type": "ListItem", "position": 3, "name": "Davie Carino", "item": "https://synergy3d.net/about-us/davie" }
      ]
    }
  ]
}