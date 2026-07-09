export const enrico ={
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": "https://synergy3d.net/about-us/enrico#webpage",
      "url": "https://synergy3d.net/about-us/enrico",
      "name": "Enrico Romano — Synergy 3D",
      "isPartOf": { "@id": "https://synergy3d.net/#website" },
      "mainEntity": { "@id": "https://synergy3d.net/about-us/enrico#person" },
      "breadcrumb": { "@id": "https://synergy3d.net/about-us/enrico#breadcrumb" },
      "inLanguage": "en-US"
    },
    {
      "@type": "Person",
      "@id": "https://synergy3d.net/about-us/enrico#person",
      "name": "Enrico Romano",
      "givenName": "Enrico",
      "familyName": "Romano",
      "jobTitle": "Chief Executive Officer & Owner",
      "description": "Enrico Romano is the founder and CEO of Synergy 3D, bringing over two decades of expertise in dental technology and laboratory science. He established Synergy 3D in November 2014 with a vision to build a fully digital dental lab and is the host of SynergyTalks.",
      "image": "https://synergy3d.net/_next/static/media/Enrico-Romano-CEO-Owner-scaled.2hx576u2msx_6.jpg",
      "url": "https://synergy3d.net/about-us/enrico",
      "worksFor": { "@id": "https://synergy3d.net/#organization" },
      "knowsAbout": [
        "Digital Workflow Strategy",
        "Full-Arch Implantology",
        "CAD/CAM Technology",
        "Practice Development",
        "Team Leadership"
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
      "@id": "https://synergy3d.net/about-us/enrico#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://synergy3d.net/" },
        { "@type": "ListItem", "position": 2, "name": "About Us", "item": "https://synergy3d.net/about-us" },
        { "@type": "ListItem", "position": 3, "name": "Enrico Romano", "item": "https://synergy3d.net/about-us/enrico" }
      ]
    }
  ]
}