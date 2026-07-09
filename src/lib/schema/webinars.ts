export const webinars={
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://synergy3d.net/webinars#webpage",
      "url": "https://synergy3d.net/webinars",
      "name": "Webinars — Synergy 3D",
      "description": "Live and on-demand expert sessions on digital dentistry, materials, workflows, and the future of restorative practice from Synergy 3D's clinical team.",
      "isPartOf": { "@id": "https://synergy3d.net/#website" },
      "about": { "@id": "https://synergy3d.net/#organization" },
      "inLanguage": "en-US",
      "breadcrumb": { "@id": "https://synergy3d.net/webinars#breadcrumb" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://synergy3d.net/webinars#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://synergy3d.net/" },
        { "@type": "ListItem", "position": 2, "name": "Learnings", "item": "https://synergy3d.net/talks" },
        { "@type": "ListItem", "position": 3, "name": "Webinars", "item": "https://synergy3d.net/webinars" }
      ]
    }
  ]
}