export const articles= {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["CollectionPage", "Blog"],
      "@id": "https://synergy3d.net/articles#webpage",
      "url": "https://synergy3d.net/articles",
      "name": "Articles — Synergy 3D",
      "description": "Evidence-based articles on materials, workflows, and the business of digital dentistry, written by Synergy 3D's technicians and clinical partners.",
      "isPartOf": { "@id": "https://synergy3d.net/#website" },
      "publisher": { "@id": "https://synergy3d.net/#organization" },
      "about": { "@id": "https://synergy3d.net/#organization" },
      "inLanguage": "en-US",
      "breadcrumb": { "@id": "https://synergy3d.net/articles#breadcrumb" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://synergy3d.net/articles#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://synergy3d.net/" },
        { "@type": "ListItem", "position": 2, "name": "Learnings", "item": "https://synergy3d.net/talks" },
        { "@type": "ListItem", "position": 3, "name": "Articles", "item": "https://synergy3d.net/articles" }
      ]
    }
  ]
}