export const milos={
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": "https://synergy3d.net/about-us/milos#webpage",
      "url": "https://synergy3d.net/about-us/milos",
      "name": "Milos Markovic — Synergy 3D",
      "isPartOf": { "@id": "https://synergy3d.net/#website" },
      "mainEntity": { "@id": "https://synergy3d.net/about-us/milos#person" },
      "breadcrumb": { "@id": "https://synergy3d.net/about-us/milos#breadcrumb" },
      "inLanguage": "en-US"
    },
    {
      "@type": "Person",
      "@id": "https://synergy3d.net/about-us/milos#person",
      "name": "Milos Markovic",
      "givenName": "Milos",
      "familyName": "Markovic",
      "jobTitle": "VP of CAD/CAM and Implantology",
      "description": "Milos Markovic leads Synergy 3D's CAD/CAM and Implantology division, bringing deep technical expertise in digital design, milling, and full-arch implant prosthetics, and overseeing the lab's most complex restorative cases.",
      "image": "https://synergy3d.net/_next/static/media/Milos-Markovic-VP-of-CADCAM-and-Implantology-scaled.3k8v4_gj0arfg.jpg",
      "url": "https://synergy3d.net/about-us/milos",
      "worksFor": { "@id": "https://synergy3d.net/#organization" },
      "knowsAbout": [
        "CAD/CAM Design",
        "Implant Prosthetics",
        "All-on-X Hybrids",
        "Surgical Guide Fabrication",
        "Digital Workflow"
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
      "@id": "https://synergy3d.net/about-us/milos#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://synergy3d.net/" },
        { "@type": "ListItem", "position": 2, "name": "About Us", "item": "https://synergy3d.net/about-us" },
        { "@type": "ListItem", "position": 3, "name": "Milos Markovic", "item": "https://synergy3d.net/about-us/milos" }
      ]
    }
  ]
}