export const gina={
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": "https://synergy3d.net/about-us/gina#webpage",
      "url": "https://synergy3d.net/about-us/gina",
      "name": "Gina Romano — Synergy 3D",
      "isPartOf": { "@id": "https://synergy3d.net/#website" },
      "mainEntity": { "@id": "https://synergy3d.net/about-us/gina#person" },
      "breadcrumb": { "@id": "https://synergy3d.net/about-us/gina#breadcrumb" },
      "inLanguage": "en-US"
    },
    {
      "@type": "Person",
      "@id": "https://synergy3d.net/about-us/gina#person",
      "name": "Gina Romano",
      "givenName": "Gina",
      "familyName": "Romano",
      "jobTitle": "Chief Marketing Officer & Owner",
      "description": "Gina Romano is the Co-Owner and Chief Marketing Officer of Synergy 3D, responsible for brand strategy, customer relationships, and the growth of the Synergy 3D community across the United States.",
      "image": "https://synergy3d.net/_next/static/media/GIna-Romano-CMO-Owner-scaled.3rcn7rr_unzyn.jpg",
      "url": "https://synergy3d.net/about-us/gina",
      "worksFor": { "@id": "https://synergy3d.net/#organization" },
      "knowsAbout": [
        "Brand Strategy",
        "Customer Relations",
        "Marketing Leadership",
        "Business Development",
        "Team Culture"
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
      "@id": "https://synergy3d.net/about-us/gina#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://synergy3d.net/" },
        { "@type": "ListItem", "position": 2, "name": "About Us", "item": "https://synergy3d.net/about-us" },
        { "@type": "ListItem", "position": 3, "name": "Gina Romano", "item": "https://synergy3d.net/about-us/gina" }
      ]
    }
  ]
}
