export const contacts={
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": "https://synergy3d.net/contact-details#webpage",
      "url": "https://synergy3d.net/contact-details",
      "name": "Contact Details — Synergy 3D",
      "description": "Get in touch with Synergy 3D. A question? A project? We are at your disposal to answer it.",
      "isPartOf": { "@id": "https://synergy3d.net/#website" },
      "about": { "@id": "https://synergy3d.net/#organization" },
      "mainEntity": { "@id": "https://synergy3d.net/#organization" },
      "inLanguage": "en-US",
      "breadcrumb": { "@id": "https://synergy3d.net/contact-details#breadcrumb" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://synergy3d.net/contact-details#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://synergy3d.net/" },
        { "@type": "ListItem", "position": 2, "name": "Contact Details", "item": "https://synergy3d.net/contact-details" }
      ]
    }
  ]
}