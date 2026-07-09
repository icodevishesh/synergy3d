export const aboutUs={
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": "https://synergy3d.net/about-us#webpage",
      "url": "https://synergy3d.net/about-us",
      "name": "About Us — Synergy 3D",
      "description": "Synergy 3D's headquarters are located in Wappingers Falls, NY, delivering industry-leading dental products and services with unmatched expertise and customer care.",
      "isPartOf": { "@id": "https://synergy3d.net/#website" },
      "about": { "@id": "https://synergy3d.net/#organization" },
      "mainEntity": { "@id": "https://synergy3d.net/#organization" },
      "inLanguage": "en-US",
      "breadcrumb": { "@id": "https://synergy3d.net/about-us#breadcrumb" },
      "hasPart": { "@id": "https://synergy3d.net/about-us#team" }
    },
    {
      "@type": "ItemList",
      "@id": "https://synergy3d.net/about-us#team",
      "name": "Synergy 3D Team",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Enrico Romano", "item": "https://synergy3d.net/about-us/enrico" },
        { "@type": "ListItem", "position": 2, "name": "Davie Carino", "item": "https://synergy3d.net/about-us/davie" },
        { "@type": "ListItem", "position": 3, "name": "Gina Romano", "item": "https://synergy3d.net/about-us/gina" },
        { "@type": "ListItem", "position": 4, "name": "Milos Markovic", "item": "https://synergy3d.net/about-us/milos" },
        { "@type": "ListItem", "position": 5, "name": "Erik Morales", "item": "https://synergy3d.net/about-us/erik" },
        { "@type": "ListItem", "position": 6, "name": "Ashley Lezon", "item": "https://synergy3d.net/about-us/ashley" },
        { "@type": "ListItem", "position": 7, "name": "Kelli Trainor", "item": "https://synergy3d.net/about-us/kelli" }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://synergy3d.net/about-us#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://synergy3d.net/" },
        { "@type": "ListItem", "position": 2, "name": "About Us", "item": "https://synergy3d.net/about-us" }
      ]
    }
  ]
}