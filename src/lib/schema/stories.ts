export const stories={
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://synergy3d.net/customer-stories#webpage",
      "url": "https://synergy3d.net/customer-stories",
      "name": "Customer Stories — Synergy 3D",
      "description": "Real results from the dentists, prosthodontists, and DSO groups who rely on Synergy 3D every day, and the outcomes they've achieved for their patients.",
      "isPartOf": { "@id": "https://synergy3d.net/#website" },
      "about": { "@id": "https://synergy3d.net/#organization" },
      "inLanguage": "en-US",
      "breadcrumb": { "@id": "https://synergy3d.net/customer-stories#breadcrumb" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://synergy3d.net/customer-stories#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://synergy3d.net/" },
        { "@type": "ListItem", "position": 2, "name": "Learnings", "item": "https://synergy3d.net/talks" },
        { "@type": "ListItem", "position": 3, "name": "Customer Stories", "item": "https://synergy3d.net/customer-stories" }
      ]
    }
  ]
}