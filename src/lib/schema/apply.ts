export const apply={
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://synergy3d.net/apply#webpage",
      "url": "https://synergy3d.net/apply",
      "name": "Careers — Join Our Team — Synergy 3D",
      "description": "Build the future of digital dentistry. Submit your resume and details to join the Synergy 3D team.",
      "isPartOf": { "@id": "https://synergy3d.net/#website" },
      "about": { "@id": "https://synergy3d.net/#organization" },
      "significantLink": "https://synergy3d.net/about-us",
      "inLanguage": "en-US",
      "breadcrumb": { "@id": "https://synergy3d.net/apply#breadcrumb" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://synergy3d.net/apply#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://synergy3d.net/" },
        { "@type": "ListItem", "position": 2, "name": "About Us", "item": "https://synergy3d.net/about-us" },
        { "@type": "ListItem", "position": 3, "name": "Join Our Team", "item": "https://synergy3d.net/apply" }
      ]
    }
  ]
}